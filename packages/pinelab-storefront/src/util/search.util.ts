import type Fuse from 'fuse.js';
import { CalculatedProduct } from '../vendure/types';
import {
  CollectionFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';

export interface SearchItem {
  name?: string;
  slug: string;
  price: number;
  collections?: string[];
  keywords?: string[];
  thumbnail?: string;
}

export interface SearchIndexObject {
  index: {
    keys: ReadonlyArray<string>;
    records: Fuse.FuseIndexRecords;
  };
  items: SearchItem[];
  keys: KeyWeight[];
}

export interface KeyWeight {
  name: string;
  weight: number;
}

interface SearchableProduct extends CalculatedProduct<ProductFieldsFragment> {
  collections: CollectionFieldsFragment[];
  customFields?: { keywords?: string };
  url?: string;
}

export class SearchUtil {
  constructor(private fuse: typeof Fuse) {}

  /**
   * Create an pre-compiled index object. Stringify this object
   * and save as publicly available JSON file, so that your
   * Storefront can fetch this object and init a Fuse
   * search engine on the client
   */
  createSearchIndex(
    products: SearchableProduct[],
    keys: KeyWeight[]
  ): SearchIndexObject {
    const searchItems = this.createSearchItems(products);
    const fuseIndex = this.fuse.createIndex(keys, searchItems);
    return {
      index: fuseIndex.toJSON(),
      items: searchItems,
      keys,
    };
  }

  createSearchItems(products: SearchableProduct[]): SearchItem[] {
    return products.map((p) => {
      const keywords = p.customFields?.keywords?.split(',');
      const collections = p.collections.map((c) => c.name);
      return {
        name: p.name,
        slug: p.slug,
        price: p.lowestPrice,
        collections,
        keywords,
        thumbnail: p.featuredAsset?.thumbnail,
        url: p.url,
      };
    });
  }

  /**
   * Create Fuse instance based on the given indexObject
   * This instance can be use in your storefront to
   * search through products
   */
  createFuse(indexObject: SearchIndexObject, options: any): Fuse<any> {
    const parsedIndex = this.fuse.parseIndex(indexObject.index);
    return new this.fuse(
      indexObject.items,
      { keys: indexObject.keys, ...options },
      parsedIndex
    );
  }
}
