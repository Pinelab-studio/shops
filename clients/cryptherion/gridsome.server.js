const { VendureServer } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const _ = require('lodash');
const { GET_CONTENT } = require('./content.queries');

module.exports = async function (api) {
  api.createPages(async ({ createPage }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );

    const [
      {
        products,
        availableCountries,
        collections: allCollections,
        productsPerCollection,
      },
      {
        cryptherion_algemeen: {
          telefoon,
          email,
          adres,
          algemene_voorwaarden,
          privacy_beleid,
          highlighted_product,
          banner,
        },
      },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    const global = { telefoon, adres, email, banner };

    const featuredProduct = products.find((p) =>
      p.facetValues.find((value) => value.code === 'main-feature')
    );

    // Get toplevel collections
    const collections = vendureServer.unflatten(allCollections);

    // Breadcrumb
    const Home = '/';
    const Winkelmand = '/cart/';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        global,
        featuredProduct,
        collections,
        featuredText: highlighted_product,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      const collectionMap = productsPerCollection.find((collectionMap) =>
        collectionMap.products.find((p) => p.slug === product.slug)
      );
      const breadcrumb = {
        Home,
      };
      if (collectionMap && collectionMap.collection) {
        const collection = collectionMap.collection;
        // add parentCollection to breadcrumb
        if (collection.parent.name !== '__root_collection__') {
          breadcrumb[
            collection.parent.name
          ] = `/categorie/${collection.parent.slug}/`;
        }
        // add collection to breadcrumb
        breadcrumb[collection.name] = `/categorie/${collection.slug}/`;
      }
      breadcrumb[product.name] = product.slug;
      createPage({
        path: `/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          global,
          collections,
          product,
          breadcrumb,
        },
      });
    });

    // ----------------- Collections ---------------------
    productsPerCollection.forEach(({ products, collection }) => {
      const breadcrumb = { Home };
      let parent;
      if (collection.parent.name !== '__root_collection__') {
        parent = collection.parent;
        breadcrumb[
          collection.parent.name
        ] = `/categorie/${collection.parent.slug}/`;
      }
      breadcrumb[collection.name] = `/categorie/${collection.slug}/`;
      const siblings = allCollections.filter(
        (c) => c.parent.id === collection.parent.id
      );
      const children = collection.children.map((child) =>
        allCollections.find((col) => col.id === child.id)
      );
      children.forEach((childCollection) => {
        // Get child products
        const childProducts =
          productsPerCollection.find(
            (p) => p.collection.id === childCollection.id
          )?.products || [];
        products.push(...childProducts);
      });
      createPage({
        path: `/categorie/${collection.slug}`,
        component: './src/templates/Collection.vue',
        context: {
          global,
          products: _.uniqBy(products, 'slug'),
          collection,
          parentCollection: parent,
          siblingCollections: siblings,
          childCollections: children,
          collections,
          breadcrumb,
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        global,
        collections,
        breadcrumb: { Home, Winkelmand },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { global, availableCountries, collections, hideNavBar: true },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: {
        global,
        collections,
      },
    });

    // ------------------ 404 ---------------
    createPage({
      path: '/404',
      component: './src/templates/404.vue',
      context: { global, collections },
    });

    // ----------------- Static pages ---------------------
    createPage({
      path: '/algemene-voorwaarden/',
      component: './src/templates/ContentPage.vue',
      context: { global, collections, content: algemene_voorwaarden },
    });
    createPage({
      path: '/privacy-beleid/',
      component: './src/templates/ContentPage.vue',
      context: { global, collections, content: privacy_beleid },
    });
    createPage({
      path: '/tot-snel/',
      component: './src/templates/UnderConstruction.vue',
      context: {
        global,
        collections,
        content: `
      <h1>We zijn er even tussen uit. 1 mei zijn we er weer!</h1>
      `,
      },
    });
  });
};
