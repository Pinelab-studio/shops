const {
  setSwatchColors,
  mapToMinimalBlog,
  mapToMinimalPage,
  mapToMinimalProduct,
  mapToMinimalCollection,
} = require('./util');
const fs = require('fs');
const Fuse = require('fuse.js');
const { GET_CONTENT } = require('./content.queries');
const {
  VendureServer,
  SearchUtil,
  deduplicate,
} = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');

module.exports = async function (api) {
  // Breadcrumb pages
  const Home = '/';

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
        // Vendure content
        products: allProducts,
        availableCountries,
        collections: allCollections,
        productsPerCollection,
      },
      {
        // Directus content
        cantastic_blogs: blogs,
        cantastic_algemeen: {
          over_cantastic: shortAbout,
          telefoon,
          instagram,
          facebook,
          usps,
          review_rating,
          popup_tonen,
          popup_content,
        },
        cantastic_paginas: pages,
        cantastic_highlight: highlights,
        cantastic_swatches: swatches,
      },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    // Set category field on products
    const products = allProducts.map((p) => {
      const facetValue = p.facetValues.find(
        (facetValue) => facetValue.facet.code === 'category-3'
      );
      p.category = facetValue ? facetValue.name : undefined;
      return p;
    });

    const collections = vendureServer.unflatten(allCollections);

    // ----------------  Global context
    const navbarCollections = collections
      .filter((col) => col.name !== 'highlights')
      .map(mapToMinimalCollection);
    const aboutPages = pages
      .filter((p) => p.categorie === 'Over Cantastic')
      .map(mapToMinimalPage);
    const servicePages = pages
      .filter((p) => p.categorie === 'Service')
      .map(mapToMinimalPage);
    const favorites = products
      .filter((p) => p.facetValues.find((f) => f.code === 'favorite'))
      .map(mapToMinimalProduct);
    const global = {
      favorites,
      aboutPages,
      servicePages,
      collections: navbarCollections,
      instagram,
      facebook,
      phoneNr: telefoon,
      usps: usps.split(','),
      rating: review_rating,
      popupEnabled: popup_tonen,
      popupContent: popup_tonen ? popup_content : undefined,
    };

    // Helper functions
    function getProductCollection(productId) {
      const collectionMap = productsPerCollection.find(({ products }) =>
        products.find((p) => p.id === productId)
      );
      if (collectionMap) {
        return allCollections.find((c) => c.id === collectionMap.collection.id);
      }
    }

    function getProductCollections(productId) {
      const collectionMap = productsPerCollection.find(({ products }) =>
        products.find((p) => p.id === productId)
      );
      if (collectionMap) {
        return allCollections.filter(
          (c) => c.id === collectionMap.collection.id
        );
      }
    }

    function getParentCollection(collectionId) {
      const collection = allCollections.find((c) => c.id === collectionId);
      const parent = collection.parent;
      if (parent.name !== '__root_collection__') {
        return allCollections.find((c) => c.id === parent.id);
      }
    }

    function getChildCollections(collectionId) {
      const collection = allCollections.find((c) => c.id === collectionId);
      const children = collection.children;
      const childCollections = children.map((child) =>
        allCollections.find((c) => child.id === c.id)
      );
      if (childCollections.length > 0) {
        return childCollections;
      }
    }

    function getSiblings(collectionId) {
      const parent = getParentCollection(collectionId);
      if (parent) {
        const siblings = parent.children.map((child) =>
          allCollections.find((c) => c.id === child.id)
        );
        if (siblings.length > 0) {
          return siblings;
        }
      }
    }

    function setNotSoldOut(products) {
      products.forEach((p) => {
        p.variants.forEach((v) => (v.stockLevel = 'IN_STOCK'));
        p.soldOut = false;
      });
    }

    // Static pages should never have soldOut products, this is updated when mounted()
    setNotSoldOut(allProducts);
    setNotSoldOut(products);
    productsPerCollection.forEach(({ products }) => setNotSoldOut(products));

    // ----------------- Search ---------------------
    const searchProducts = products.map((p) => ({
      ...p,
      collections: getProductCollections(p.id) || [],
    }));
    const searchUtil = new SearchUtil(Fuse);
    const indexObject = searchUtil.createSearchIndex(searchProducts, [
      {
        name: 'keywords',
        weight: 3,
      },
      {
        name: 'name',
        weight: 2,
      },
      {
        name: 'collections',
        weight: 1,
      },
    ]);
    fs.writeFileSync('./static/_search.json', JSON.stringify(indexObject));

    // ----------------- Index ---------------------
    const highlightsParent = allCollections.find(
      (col) => col.slug === 'highlights'
    );
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        ...global,
        highlights,
        shortAbout,
        blogs: blogs.slice(0, 3).map(mapToMinimalBlog),
        brands: collections.find((collection) => collection.slug === 'merken')
          .children,
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      // Set product in breadcrumb
      let breadcrumb = { [product.name]: `/product/${product.slug}` }; // Astro cap
      const productCollection = getProductCollection(product.id);
      if (productCollection) {
        // Set direct parent collection (Fat caps)
        breadcrumb = Object.assign(
          { [productCollection.name]: `/categorie/${productCollection.slug}/` },
          breadcrumb
        );
        const parentCollection = getParentCollection(productCollection.id);
        if (parentCollection) {
          // Set collections parent (Caps)
          breadcrumb = Object.assign(
            { [parentCollection.name]: `/categorie/${parentCollection.slug}/` },
            breadcrumb
          );
          const parentsParent = getParentCollection(parentCollection.id);
          if (parentsParent) {
            // Set parents parent (Spray paint)
            breadcrumb = Object.assign(
              { [parentsParent.name]: `/categorie/${parentsParent.slug}/` },
              breadcrumb
            );
          }
        }
      }
      let component = 'ProductDetail.vue';
      const swatchFacet = product.facetValues.find(
        (f) => f.code.indexOf('swatch') > -1
      );
      if (swatchFacet) {
        component = 'ColorSwatchProduct.vue';
        setSwatchColors(swatches, product, swatchFacet.code, '#000000');
      }

      // Add Home before others
      breadcrumb = Object.assign({ Home }, breadcrumb);
      createPage({
        path: `/product/${product.slug}`,
        component: `./src/templates/${component}`,
        context: {
          ...global,
          breadcrumb,
          product,
          colorChart: swatchFacet ? swatchFacet.code : undefined,
        },
      });
    });

    // ------------------------- Category pages ----------------------
    productsPerCollection.forEach(({ products, collection }) => {
      products.map((p) => p.soldOut);
      // Create breadcrumb
      let breadcrumb = { [collection.name]: `/categorie/${collection.slug}/` };
      const parentCollection = getParentCollection(collection.id);
      let collectionLevel = 1;
      if (parentCollection) {
        // Level 1 collections don't have parents
        collectionLevel = 2;
        breadcrumb = Object.assign(
          { [parentCollection.name]: `/categorie/${parentCollection.slug}/` },
          breadcrumb
        );
        const parentsParent = getParentCollection(parentCollection.id);
        if (parentsParent) {
          collectionLevel = 3;
          breadcrumb = Object.assign(
            { [parentsParent.name]: `/categorie/${parentsParent.slug}/` },
            breadcrumb
          );
        }
      }
      breadcrumb = Object.assign({ Home }, breadcrumb);
      const childCollections = getChildCollections(collection.id);
      let template = 'Category.vue';
      if (collectionLevel > 1) {
        // Any collection deeper then toplevel should be a productListing
        template = 'ProductListing.vue';
      }
      if (!childCollections?.length && products?.length > 0) {
        // if products but no childcollections, then its a product listing
        template = 'ProductListing.vue';
      }
      if (collectionLevel === 2) {
        // get products of childCollections
        for (const childCollection of childCollections || []) {
          products.push(
            ...productsPerCollection.find(
              (ppc) => ppc.collection.id === childCollection.id
            )?.products
          );
        }
      }
      createPage({
        path: `/categorie/${collection.slug}`,
        component: `./src/templates/${template}`,
        context: {
          ...global,
          breadcrumb,
          collection,
          childCollections,
          siblings: getSiblings(collection.id),
          products: deduplicate(products),
        },
      });
    });

    // ------------------Blog Listing ----------
    createPage({
      path: `/blog/`,
      component: './src/templates/BlogListing.vue',
      context: {
        ...global,
        blogs,
        breadcrumb: {
          Home: '/',
          Blog: '/blog/',
        },
      },
    });

    // ----------------- Blog ------------
    blogs.forEach((blog) => {
      createPage({
        path: `/blog/${blog.slug}`,
        component: './src/templates/Blog.vue',
        context: {
          ...global,
          blog,
          relatedBlogs: blogs.slice(0, 3),
          breadcrumb: {
            Home: '/',
            Blog: '/blog/',
            [blog.title]: `/blog/${blog.slug}`,
          },
        },
      });
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/winkelmand/',
      component: './src/templates/Cart.vue',
      context: {
        ...global,
        hideUsps: false,
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: {
        ...global,
        availableCountries,
        hideUsps: true,
      },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/OrderConfirmation.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });

    // ----------------- 404 ------------
    createPage({
      path: '/404/',
      component: './src/templates/404.vue',
      context: {
        ...global,
        hideUsps: true,
      },
    });

    // ----------------- Static pages ------------
    pages.forEach((page) => {
      createPage({
        path: `/${page.slug}/`,
        component: './src/templates/StaticPage.vue',
        context: {
          ...global,
          hideUsps: false,
          page,
        },
      });
    });
  });
};
