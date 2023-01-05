import {
  CollectionFieldsFragment,
  OrderFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';
import { Emitter } from 'mitt';
import { VendureClient } from './vendure.client';

export interface CatalogData {
  /**
   * All products from store
   */
  products: CalculatedProduct<ProductFieldsFragment>[];
  /**
   * Products with variants per collection
   */
  productsPerCollection: CollectionMap[];
  /**
   * All collections from the store
   * DOES NOT INCLUDE VARIANTS. Just basic collection info
   */
  collections: BasicCollection[];
}

export interface CollectionMap {
  collection: BasicCollection;
  products: CalculatedProduct<ProductFieldsFragment>[];
}

export type CalculatedProduct<T> = T & {
  lowestPrice: number;
  soldOut: boolean;
};

export interface MinimalProduct {
  id: string;
  slug: string;
  variants: { priceWithTax: number; stockLevel: string; id: string }[];
}

export type BasicCollection = Omit<CollectionFieldsFragment, 'productVariants'>;

export interface SortableCollection extends BasicCollection {
  parent?: SortableCollection;
  children?: SortableCollection[];
}

export class Store<T> {
  activeOrder: (OrderFieldsFragment & T) | undefined;
}

export class VendureError extends Error {
  constructor(
    public message: string,
    public orderCode?: string,
    public errorCode?: string
  ) {
    super(message);
  }
}
