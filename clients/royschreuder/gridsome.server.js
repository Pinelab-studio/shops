const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    let { products, productsPerCollection, collections, availableCountries } =
      await vendureServer.getShopData();

    collections = collections.map((c) => ({
      name: c.name,
      slug: c.slug,
      id: c.id,
      featuredAsset: c.featuredAsset,
    }));

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products: products.reverse(),
        collections: collections,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}/`,
        component: './src/templates/ProductDetail.vue',
        context: {
          product,
          previousPage: '/',
        },
      });
    });

    // ----------------- Collection pages ---------------------
    productsPerCollection.forEach((collectionMap) => {
      createPage({
        path: `/${collectionMap.collection.slug}/`,
        component: './src/templates/Index.vue',
        context: {
          products: collectionMap.products,
          collection: collectionMap.collection,
          previousPage: '/',
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {},
    });

    // ----------------- checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        availableCountries,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {},
    });
  });
};
