const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );

    const { products, availableCountries } = await vendureServer.getShopData();

    // ----------------- ProductOverview ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          product,
          back: '/',
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {},
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { availableCountries },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {},
    });
  });
};
