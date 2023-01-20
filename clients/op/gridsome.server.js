const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );

    const { products } = await vendureServer.getShopData();

    const global = {
      email: 'info@ophetboek.nl',
      instagram: 'https://www.instagram.com/tipvanjet/',
      facebook: 'https://www.facebook.com/jetvnieuwkerk/',
    };

    if (!products || !products.length) {
      throw Error(`No products found!`);
    }

    products[0].assets = products[0].assets.filter(
      (asset) => asset.preview !== products[0].featuredAsset.preview
    );

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        product: products[0],
        ...global,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        product: products[0],
        ...global,
      },
    });

    /*    createPage({
      path: '/under-construction/',
      component: './src/templates/UnderConstruction.vue',
    });*/
  });
};
