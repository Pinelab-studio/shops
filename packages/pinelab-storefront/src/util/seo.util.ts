/**
 * Removes all HTML tags from a HTML string and truncate to max X characters
 */
import { ProductFieldsFragment } from '../generated/graphql';
import { BasicCollection, CalculatedProduct } from '../vendure/types';

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

export function getMetaInfo(
  item?:
    | BasicCollection
    | ProductFieldsFragment
    | CalculatedProduct<ProductFieldsFragment>,
  url?: string,
  review?: { averageRating: number; reviewCount: number },
  type: 'product' | 'article' | 'blog' | 'website' = 'product'
): MetaInfo | undefined {
  if (!item) {
    return;
  }
  const seoDescription =
    (item as ProductFieldsFragment).customFields?.metaDescription ||
    getSeoDescription(item.description);
  const title =
    (item as ProductFieldsFragment).customFields?.metaTitle || item.name;
  const image = item.featuredAsset ? item.featuredAsset.preview : undefined;
  let script: any = [];
  const calculatedProduct = item as CalculatedProduct<ProductFieldsFragment>;
  if (calculatedProduct.lowestPrice) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    let jsonLD: any = {
      type: 'application/ld+json',
      json: {
        '@context': 'http://schema.org',
        '@type': 'Product',
        name: item.name,
        image: image,
        description: seoDescription,
        offers: {
          '@type': 'Offer',
          price: (calculatedProduct.lowestPrice / 100).toFixed(2),
          priceCurrency: 'EUR',
          priceValidUntil: date.toISOString(),
          availability: 'InStock',
        },
      },
    };
    if (review) {
      jsonLD.json.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: review.averageRating,
        bestRating: '5',
        ratingCount: review.reviewCount,
      };
    }
    script.push(jsonLD);
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
