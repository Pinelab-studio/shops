import { VendureClient } from '../vendure/vendure.client';
import { Emitter } from 'mitt';
import { ProductFieldsFragment, ProductVariant } from '../generated/graphql';
import { CalculatedProduct, MinimalProduct } from '../vendure/types';

/**
 * Enrich given product with additional fields
 */
export function setCalculatedFields<T extends MinimalProduct>(
  product: T
): CalculatedProduct<T> {
  const lowestPrice = Math.min(...product.variants.map((v) => v.priceWithTax));
  const highestPrice = Math.max(...product.variants.map((v) => v.priceWithTax));
  const allVariantsOutOfStock = product.variants.every((v) => isOutOfStock(v));
  return {
    ...product,
    lowestPrice,
    highestPrice,
    soldOut: allVariantsOutOfStock,
  };
}

/**
 * Remove duplicate products from given list of products
 */
export function deduplicate(
  products: ProductFieldsFragment[]
): ProductFieldsFragment[] {
  const uniq: string[] = [];
  return products.filter((prod) => {
    if (uniq.indexOf(prod.slug) === -1) {
      uniq.push(prod.slug);
      return true;
    }
    return false;
  });
}

/**
 * Hydrate products on client side.
 * For now this only updates product.soldOut
 */
export async function hydrate<T extends MinimalProduct>(
  products: CalculatedProduct<T>[] | CalculatedProduct<T>,
  vendure: VendureClient
): Promise<void> {
  if (Array.isArray(products)) {
    if (products.length === 0) {
      return;
    }
    const productIds = products.map((p) => p.id);
    const stockLevels = (await vendure.getStockForProducts(productIds)).map(
      (stockLevel) => setCalculatedFields(stockLevel)
    );
    products.forEach((p) => {
      const productWithStockLevel = stockLevels.find(
        (productWithStockLevel) => productWithStockLevel.id === p.id
      );
      if (productWithStockLevel) {
        p.soldOut = productWithStockLevel.soldOut;
        p.variants.forEach((v) => {
          v.stockLevel =
            productWithStockLevel.variants.find((hv) => hv.id === v.id)
              ?.stockLevel || 'IN_STOCK';
        });
      }
      return p;
    });
  } else if (products) {
    // Single product
    const product = products as CalculatedProduct<T>;
    const [hydratedProduct] = (
      await vendure.getStockForProducts([product.id])
    ).map((stockLevel) => setCalculatedFields(stockLevel));
    product.variants.forEach((v) => {
      v.stockLevel =
        hydratedProduct.variants.find((hv) => hv.id === v.id)?.stockLevel ||
        'IN_STOCK';
    });
    product.soldOut = hydratedProduct.soldOut;
  }
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
