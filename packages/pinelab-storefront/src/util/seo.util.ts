import {
  CollectionFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';

/**
 * Removes all HTML tags from a HTML string and truncate to max X characters
 */
export function getSeoDescription(description?: string) {
  const maxlength = 120;
  const minlength = 70;
  if (!description) {
    return;
  }
  description = description.replace(/<[^>]*>?/gm, ' '); // replace html
  description = description.replace(/&nbsp;/g, ' '); // replace &nbsp;
  description.replace(/\s\s+/g, ' '); // replace double spaces
  const sentence = description.substr(0, description.indexOf('.') + 1);
  if (sentence.length > maxlength) {
    // truncate to max
    return sentence.substr(0, maxlength).trim() + '...';
  } else if (sentence.length > minlength) {
    // Between min and max, perfect!
    return sentence.trim();
  } else {
    // Sentence too short, just take first X chars of description
    return description.substring(0, maxlength).trim() + '...';
  }
}

/**
 * Return a Vue metaInfo object based on a given collection or product
 * Uses item.customFields.metaDescription and item.customFields.metaTitle when these fields exist
 */
export function getMetaInfo(
  item?:
    | CollectionFieldsFragment
    | (ProductFieldsFragment & { lowestPrice: number }),
  url?: string,
  type: 'product' | 'article' | 'blog' | 'website' = 'product'
): MetaInfo | undefined {
  if (!item) {
    return;
  }
  const seoDescription =
    (item as any).customFields?.metaDescription ||
    getSeoDescription(item.description);
  const title = (item as any).customFields?.metaTitle || item.name;
  const image = item.featuredAsset ? item.featuredAsset.preview : undefined;
  let script: any = [];
  const product = item;
  if ((product as any).lowestPrice) {
    script = [
      {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'Product',
          name: item.name,
          image: image,
          description: seoDescription,
          offers: {
            '@type': 'Offer',
            price: ((product as any).lowestPrice / 100).toFixed(2),
            priceCurrency: 'EUR',
          },
        },
      },
    ];
  }
  return {
    title: title || item.slug,
    meta: [
      { key: 'title', name: 'title', content: title || item.slug },
      { key: 'description', name: 'description', content: seoDescription },
      { key: 'og:title', name: 'og:title', content: title },
      {
        key: 'og:description',
        name: 'og:description',
        content: seoDescription,
      },
      { key: 'og:image', name: 'og:image', content: image },
      { key: 'og:type', name: 'og:type', content: type },
      { key: 'og:url', name: 'og:url', content: url || `/${item.slug}` },
    ],
    script,
  };
}

export interface MetaInfo {
  title: string;
  meta: any[];
  script: any[];
}

/**
 * Preconnect links to inject in Head for Google storage images and
 */
export const preconnectLinks = [
  {
    rel: 'preconnect',
    href: 'https://storage.googleapis.com',
    crossorigin: true,
  },
  {
    rel: 'preconnect',
    href: 'https://content.pinelab.studio',
    crossorigin: true,
  },
];
