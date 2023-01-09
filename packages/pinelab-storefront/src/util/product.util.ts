import { VendureClient } from '../vendure/vendure.client';
import { Emitter } from 'mitt';
import { ProductFieldsFragment, ProductVariant } from '../generated/graphql';

export interface MinimalProduct {
  id: string;
  slug: string;
  variants: { priceWithTax: number; stockLevel: string; id: string }[];
}

/**
 * Product with additional utility properties
 */
export type ProductWithUtilityFields<T> = T & {
  lowestPrice: number;
  soldOut: boolean;
  /**
   * Absolute url without domain based on the provided prefix and the products slug. I.E. /product/my-product-slug/
   */
  url: string;
  label?: string;
};

/**
 * Enrich given product with additional utility properties
 */
export function enrichProduct<T extends ProductFieldsFragment>(
  product: T,
  urlPrefix: string
): ProductWithUtilityFields<T> {
  const prices: number[] = [];
  product.variants.forEach((v) => {
    prices.push(v.priceWithTax);
  });
  return {
    ...product,
    lowestPrice: Math.min(...prices),
    highestPrice: Math.max(...prices),
    soldOut: isProductSoldOut(product),
    url: getUrl(product, urlPrefix),
    label: product.facetValues.find(
      (facetValue) => facetValue.facet.code === 'product-label'
    )?.name,
  };
}

type ProductWithVariants = {
  variants: { id: string | number; stockLevel: string }[];
};
/**
 * A product is sold out if all its variants are out of stock
 */
export function isProductSoldOut(product: ProductWithVariants): boolean {
  return product.variants.every((v) => isOutOfStock(v));
}

/**
 * Update the stockLevels of variants of a product based on a freshly fetched product
 */
export function updateStockLevelOfVariants(
  product: ProductWithVariants,
  freshProduct: ProductWithVariants
): void {
  product.variants.forEach((v) => {
    v.stockLevel =
      freshProduct.variants.find((hv) => hv.id === v.id)?.stockLevel ||
      'IN_STOCK';
  });
}

/**
 * Set the full path of a product or collection on item.url
 */
export function getUrl(
  itemWithSlug: { slug: string },
  prefixPath: string
): string {
  return `/${prefixPath}/${itemWithSlug.slug}/`.replace(/\/\//g, '/'); // replace all double slashes with single slashes
}

/**
 * Remove duplicate products from given list of products
 */
export function deduplicate<T extends ProductFieldsFragment>(
  products: T[]
): T[] {
  const uniq: string[] = [];
  return products.filter((prod) => {
    if (uniq.indexOf(prod.slug) === -1) {
      uniq.push(prod.slug);
      return true;
    }
    return false;
  });
}

export function isOutOfStock(variant: { stockLevel: string }): boolean {
  return variant.stockLevel === 'OUT_OF_STOCK';
}

/**
 * Adds product to cart. Emitts error if something fails, never throws error
 */
export async function buy(
  variant: ProductVariant,
  ctx: { vendure: VendureClient; emitter: Emitter<any> },
  quantity = 1
): Promise<void> {
  try {
    await ctx.vendure.addProductToCart(variant.id, quantity);
    ctx.emitter.emit('productAdded', { variantId: variant.id, quantity });
  } catch (e) {
    ctx.emitter.emit('error', e);
  }
}
