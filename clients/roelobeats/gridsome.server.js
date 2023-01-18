const { VendureServer } = require('pinelab-storefront');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    let { products, availableCountries, collections, productsPerCollection } =
      await vendureServer.getShopData();
    collections = vendureServer.unflatten(collections);

    const highlight1 = products.find((p) => {
      return p.facetValues.find((f) => f.code === 'highlights-1');
    });

    const highlight2 = products.find((p) => {
      return p.facetValues.find((f) => f.code === 'highlights-2');
    });

    const highlight3 = products.find((p) => {
      return p.facetValues.find((f) => f.code === 'highlights-3');
    });

    console.log(highlight1);
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        products,
        highlight1,
        highlight2,
        highlight3,
        topproducts: products.slice(0, 5),
        categories: collections,
      },
    });
  });
};
