import {
  CollectionFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';
import { deduplicate, enrichProduct } from './product.util';

type TreeCollection<T extends CollectionFieldsFragment> = T & {
  children: T;
  parent: T;
};

/**
 * By default the collection graphql query returns all child and parent collections in one flat array.
 * This function builds the collection tree with child and parent collections
 */
export function getCollectionTree<T extends CollectionFieldsFragment>(
  allCollections: T[]
): TreeCollection<T>[] {
  // Get toplevel collections
  let collections = allCollections.filter(
    (col) => col.parent?.name === '__root_collection__'
  );
  // Find and set child collections, because queried children only have id and name fields
  return collections.map((collection) =>
    getChildCollection(collection, allCollections)
  );
}

/**
 * Recursively gets childCollections for given collection
 */
export function getChildCollection<T extends CollectionFieldsFragment>(
  collection: T,
  allCollections: T[]
): TreeCollection<T> {
  const fullChildren = collection.children?.map((originalChild) => {
    let fullChildCollection = allCollections.find(
      (c) => c.id === originalChild.id
    );
    if (!fullChildCollection) {
      throw Error(
        `Child collection ${originalChild.name} is not in allCollections list`
      );
    }
    if (fullChildCollection?.children?.length) {
      fullChildCollection = getChildCollection(
        fullChildCollection,
        allCollections
      );
    }
    return fullChildCollection;
  });
  return {
    ...collection,
    children: fullChildren,
  } as TreeCollection<T>;
}

/**
 * Find products that belong to the given Collection
 */
export function getProductsForCollection<T extends ProductFieldsFragment>(
  collection: CollectionFieldsFragment,
  allProducts: T[]
): T[] {
  let productsPerCollection: T[] = collection.productVariants.items
    .map((variant) =>
      allProducts.find((product) => product.id === variant.product.id)
    )
    .filter((product): product is T => !!product);
  return deduplicate(productsPerCollection);
}
