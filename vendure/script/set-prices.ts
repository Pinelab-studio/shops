import {
  bootstrap,
  ChannelService,
  EntityHydrator,
  ProductService,
  ProductVariantService,
  RequestContext,
} from '@vendure/core';

/**
 * Set a single price for all variants of a product
 */

const products = {
  // 'loop-colors-400ml': 396,
  // 'loop-colors-maxi-600ml': 513,
  'loop-colors-asphalt-400ml': 407,
  'loop-colors-fluorescent-400ml': 418,
  'loop-colors-metallic-400ml': 407,
  'loop-colors-transparent-400ml': 396,
  'montana-adhesive-permanent-400ml': 895,
  'montana-black-150ml': 285,
  'montana-black-400ml': 406,
  'montana-ultra-wide-750ml': 725,
};

(async () => {
  const channelToken = process.argv[2];
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    channel,
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
  });
  for (const [productSlug, newPrice] of Object.entries(products)) {
    console.log(`Updating ${productSlug}`);
    const product = await app
      .get(ProductService)
      .findOneBySlug(ctx, productSlug);
    if (!product) {
      console.error(`No product found for slug ${productSlug}`);
      continue;
    }
    await app
      .get(EntityHydrator)
      .hydrate(ctx, product, { relations: ['variants'] });
    const variants = product.variants
      .filter((variant) => !variant.deletedAt)
      .map((variant) => ({ id: variant.id, price: newPrice }));
    await app.get(ProductVariantService).update(ctx, variants);
    console.log(`Updated ${variants.length} variants to price ${newPrice}`);
  }

  process.exit(0);
})();
