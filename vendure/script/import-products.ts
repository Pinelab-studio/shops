import {
  bootstrap,
  ChannelService,
  LanguageCode,
  ProductOptionGroup,
  ProductService,
  ProductVariantService,
  RequestContext,
  TaxCategoryService,
  TransactionalConnection,
  Translated,
} from '@vendure/core';
import { CreateProductVariantInput } from '@vendure/common/lib/generated-types';
import { INestApplication } from '@nestjs/common';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import { ProductOptionResolver } from '@vendure/core/dist/api/resolvers/admin/product-option.resolver';
import * as path from 'path';
import { cantasticReader } from './product-import-strategies/cantastic-reader';

/**
 * Use this importer like this:
 * yarn script:test script/import-products data/cantastic.csv
 * yarn script:test script/import-products data/cantastic.csv DELETE // for deletion of producst by slug
 * cantastic is the channelToken and the name of the strategy that will be used
 */

export type CsvToProductFn = (csvRows: any[]) => ImportableProduct[];

export interface ImportableProduct {
  name: string;
  slug: string;
  description: string;
  variants: ImportableVariant[];
}

export interface ImportableVariant {
  name: string;
  sku: string;
  stock: number;
  price: number;
  options: ImportableOption[];
}

export interface ImportableOption {
  name: string;
  value: string;
}

const strategies: { [key: string]: CsvToProductFn } = {
  cantastic: cantasticReader,
};

let app: INestApplication;
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const filePath = process.argv[2];
  const action = process.argv[3];
  const channelToken = path.basename(filePath, '.csv');
  if (!fs.existsSync(filePath)) {
    await logAndExit(`${filePath} doesn't exists`);
  }
  const transformCsvToProducts = strategies[channelToken];
  if (!transformCsvToProducts) {
    await logAndExit(`No csvReader strategy defined for ${channelToken}`);
  }
  // parse data
  let rows = await parse(filePath);
  // rows = rows.slice(0, 10);
  const products = transformCsvToProducts(rows);
  if (!products || products.length === 0) {
    await logAndExit('No products to import');
  }
  console.log(
    `${action === 'DELETE' ? 'Deleting' : 'Importing'} ${
      products.length
    } products from ${filePath} in channel ${channelToken} in database ${
      process.env.DATABASE_NAME
    }`
  );
  await sleep(5000); // Wait for user to read message
  // Import to DB
  const { config } = require('../src/vendure-config');
  app = await bootstrap(config);
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const connection = await app.get(TransactionalConnection);
  const ctx = new RequestContext({
    channel,
    isAuthorized: true,
    apiType: 'admin',
    authorizedAsOwnerOnly: false,
  });
  const taxCategories = await app.get(TaxCategoryService).findAll(ctx);
  const defaultTaxCategory = taxCategories.find((tc) => tc.isDefault);
  if (!defaultTaxCategory) {
    await logAndExit('No default taxCategory found in DB!');
  }
  // Cleanup max length of names and codes
  const maxlength = 240;
  products.forEach((product) => {
    product.slug = product.slug.substring(0, maxlength);
    product.name = product.name.substring(0, maxlength);
    product.variants.forEach((variant) => {
      variant.sku = variant.sku.substring(0, maxlength);
      variant.name = variant.name.substring(0, maxlength);
      variant.options.forEach((option) => {
        option.name = option.name.substring(0, maxlength);
        option.value = option.value.substring(0, maxlength);
      });
    });
  });
  // Import
  await connection.withTransaction(ctx, async (transactionalCtx) => {
    for (const product of products) {
      if (action === 'DELETE') {
        const existing = await app
          .get(ProductService)
          .findOneBySlug(ctx, product.slug);
        if (existing) {
          await app.get(ProductService).softDelete(ctx, existing.id);
        }
        console.log(`DELETED ${product.slug}`);
      } else {
        await createProduct(
          app,
          transactionalCtx,
          product,
          defaultTaxCategory!.id as string
        )
          .then(() => console.log(`Created ${product.slug}`))
          .catch((err) =>
            console.error(`Failed to import ${product.slug}`, err)
          );
      }
    }
  });

  process.exit(0);
})();

/**
 * Parse local csv file
 */
function parse(fileName: string): Promise<any[]> {
  const file = fs.readFileSync(fileName);
  return new Promise((resolve) => {
    Papa.parse(file.toString(), {
      header: true,
      complete: function (results) {
        resolve(results.data);
      },
    });
  });
}

/**
 * Write product to DB
 */
async function createProduct(
  app: INestApplication,
  ctx: RequestContext,
  product: ImportableProduct,
  defaultTaxCategoryId: string
): Promise<void> {
  const productService = app.get(ProductService);
  const productOptionResolver = app.get(ProductOptionResolver);
  const variantService = app.get(ProductVariantService);
  // Create product
  const { id: productId, slug } = await productService.create(ctx, {
    enabled: true,
    translations: [
      {
        languageCode: LanguageCode.en,
        name: product.name,
        slug: product.slug,
        description: product.description,
      },
    ],
  });
  const optionGroups = new Map<string, string[]>();
  product.variants.forEach((variant) => {
    variant.options.forEach((option) => {
      const existingOptions = optionGroups.get(option.name) || [];
      existingOptions.push(option.value);
      optionGroups.set(option.name, existingOptions);
    });
  });
  // Create optionGroups
  const createdGroups: Translated<ProductOptionGroup>[] = [];
  // @ts-ignore
  for (const [optionName, optionValues] of optionGroups.entries()) {
    const createdGroup = await productOptionResolver.createProductOptionGroup(
      ctx,
      {
        input: {
          code: optionName,
          translations: [
            {
              languageCode: LanguageCode.en,
              name: optionName,
            },
          ],
          options: optionValues.map((value) => ({
            code: value,
            translations: [
              {
                languageCode: LanguageCode.en,
                name: value,
              },
            ],
          })),
        },
      }
    );
    createdGroups.push(createdGroup);
    await productService.addOptionGroupToProduct(
      ctx,
      productId,
      createdGroup.id
    );
  }
  // Find optionIds for variant
  const createdOptions = createdGroups.map((group) => group.options).flat();
  const input: CreateProductVariantInput[] = product.variants.map((variant) => {
    const optionIds = new Set<string | number>();
    variant.options.forEach((variantOption) => {
      const createdOption = createdOptions.find(
        (option) => option.code === variantOption.value
      );
      if (!createdOption) {
        throw Error(
          `Could not find created option for ${variant.sku} - ${variantOption.value}`
        );
      }
      optionIds.add(createdOption.id);
    });
    return {
      productId,
      sku: variant.sku,
      price: variant.price,
      stockOnHand: variant.stock,
      optionIds: Array.from(optionIds),
      taxCategoryId: defaultTaxCategoryId,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: variant.name,
        },
      ],
    };
  });
  await variantService.create(ctx, input);
}

async function logAndExit(message: string) {
  console.error(message);
  await app?.close();
  process.exit(1);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
