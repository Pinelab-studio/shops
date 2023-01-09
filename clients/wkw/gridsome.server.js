const { VendureServer, createLabelFunction } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const {
  mapToMinimalCollection,
  mapToMinimalPage,
  mapToMinimalBlogPage,
  setFullUrl,
} = require('./util');
const { GET_CONTENT } = require('./content.queries');

module.exports = async function (api) {
  const getlabel = createLabelFunction([
    require('./labels/nl.json'),
    require('./labels/en.json'),
  ]);

  api.createPages(async ({ createPage }) => {
    const vendureNL = new VendureServer(
      `${process.env.GRIDSOME_VENDURE_API}?languageCode=nl`,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const vendureEN = new VendureServer(
      `${process.env.GRIDSOME_VENDURE_API}?languageCode=en`,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );

    let {
      products: productsNL,
      collections: collectionsNL,
      productsPerCollection: productsPerCollectionNL,
      availableCountries,
    } = await vendureNL.getShopData();

    let {
      products: productsEN,
      collections: collectionsEN,
      productsPerCollection: productsPerCollectionEN,
    } = await vendureEN.getShopData();

    const {
      wkw_home: home,
      wkw_algemeen: common,
      wkw_paginas: pages,
      wkw_blogs: blogs,
      wkw_reviews: reviews,
    } = await directus.request(GET_CONTENT);

    const pages_nl = pages.filter((p) => p.language === 'nl');
    const pages_en = pages.filter((p) => p.language === 'en');

    const blogs_nl = blogs.filter((b) => b.language === 'nl');
    const blogs_en = blogs.filter((b) => b.language === 'en');

    const languages = [
      {
        lang: 'nl',
        products: productsNL,
        collections: collectionsNL,
        productsPerCollection: productsPerCollectionNL,
        pages: pages_nl,
        blogs: blogs_nl,
      },
      {
        lang: 'en',
        products: productsEN,
        collections: collectionsEN,
        productsPerCollection: productsPerCollectionEN,
        pages: pages_en,
        blogs: blogs_en,
      },
    ];

    // Set full urls for all products and collections or all languages
    languages.forEach(
      ({
        products,
        collections: allCollections,
        productsPerCollection,
        lang,
      }) => {
        const slugPrefix = getlabel('urls.slug-prefix', lang);
        const categoryPrefix = getlabel('urls.category-prefix', lang);
        const productPrefix = getlabel('urls.product-prefix', lang);
        allCollections.forEach((c) =>
          setFullUrl(c, `${slugPrefix}/${categoryPrefix}`)
        );
        products.forEach((p) =>
          setFullUrl(p, `${slugPrefix}/${productPrefix}`)
        );
        productsPerCollection.forEach((collectionMap) => {
          collectionMap.products.forEach((p) =>
            setFullUrl(p, `${slugPrefix}/${productPrefix}`)
          );
          setFullUrl(
            collectionMap.collection,
            `${slugPrefix}/${categoryPrefix}`
          );
          return collectionMap;
        });
      }
    );

    // Create pages for each language
    for (let {
      products,
      collections: allCollections,
      productsPerCollection,
      lang,
      pages,
      blogs,
    } of languages) {
      const slugPrefix = getlabel('urls.slug-prefix', lang);

      const collections = vendureNL.unflatten(allCollections);
      const navbarCollections = collections.map(mapToMinimalCollection);
      const pageLinks = pages.map(mapToMinimalPage);
      const blogPageLinks = blogs.map(mapToMinimalBlogPage);
      pages.forEach((p) => setFullUrl(p, `${slugPrefix}/`));

      // Breadcrumb pages
      const Home = '/';

      const global = {
        navbarCollections,
        lang,
        common,
        pageLinks,
      };

      // -------------------- Home -----------------------------------
      createPage({
        path: `/${slugPrefix}`,
        component: './src/templates/Index.vue',
        context: {
          ...global,
          popularProducts: products.slice(0, 5), // popular products for now,
          popularCollections: collections.slice(0, 5),
          blogPageLinks,
          home,
        },
      });

      // ----------------- Static pages ------------
      pages.forEach((page) => {
        createPage({
          path: page.url,
          component: './src/templates/StaticPage.vue',
          context: {
            ...global,
            page,
          },
        });
      });

      // -------------------- ProductDetail -----------------------------------
      products.forEach((product) => {
        const reviewsForThisProduct = reviews.filter(
          (review) => review.vendure_product_id == product.id
        );
        const sum = reviewsForThisProduct.reduce((a, b) => a + b.rating, 0);
        const avg = sum / reviewsForThisProduct.length || 0;
        const avgRating = Math.round(avg * 10) / 10;
        // Find translated version of current product
        const translatedPages = {};
        languages.forEach((language) => {
          let translatedProduct = language.products.find(
            (p) => p.id == product.id
          );

          translatedPages[language.lang] = translatedProduct.url;
        });

        const breadcrumb = {
          Home,
          [product.name]: product.url,
        };
        createPage({
          path: product.url,
          component: './src/templates/ProductDetail.vue',
          context: {
            ...global,
            product,
            reviews: reviewsForThisProduct,
            avgRating,
            breadcrumb,
            translatedPages,
          },
        });
      });
    }
  });
};
