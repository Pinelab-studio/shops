const {
  VendureServer,
  createLabelFunction,
  SearchUtil,
} = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const {
  mapToMinimalCollection,
  mapToMinimalPage,
  mapToMinimalBlogPage,
  setFullUrl,
  getProductCollections,
  findTranslatedFields,
} = require('./util');
const { GET_CONTENT } = require('./content.queries');
const fs = require('fs');
const Fuse = require('fuse.js');

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
      availableCountries: availableCountriesNL,
    } = await vendureNL.getShopData();

    let {
      products: productsEN,
      collections: collectionsEN,
      productsPerCollection: productsPerCollectionEN,
      availableCountries: availableCountriesEN,
    } = await vendureEN.getShopData();

    const {
      wkw_home: home_all, // _all means it contains all languages
      wkw_algemeen: common_all,
      wkw_paginas: pages,
      wkw_blogs: blogs,
      wkw_reviews: reviews,
    } = await directus.request(GET_CONTENT);

    const pages_nl = pages.filter((p) => p.language === 'nl');
    const pages_en = pages.filter((p) => p.language === 'en');

    const blogs_nl = blogs.filter((b) => b.language === 'nl');
    const blogs_en = blogs.filter((b) => b.language === 'en');

    // Find '_en' counterpart of fields if they exist
    const common_en = findTranslatedFields(common_all, 'en');
    const home_en = findTranslatedFields(home_all, 'en');

    const languages = [
      {
        lang: 'nl',
        products: productsNL,
        collections: collectionsNL,
        productsPerCollection: productsPerCollectionNL,
        pages: pages_nl,
        blogs: blogs_nl,
        availableCountries: availableCountriesNL,
        slugPrefix: getlabel('urls.slug-prefix', 'nl'),
        common: common_all,
        homeContent: home_all,
      },
      {
        lang: 'en',
        products: productsEN,
        collections: collectionsEN,
        productsPerCollection: productsPerCollectionEN,
        pages: pages_en,
        blogs: blogs_en,
        availableCountries: availableCountriesEN,
        slugPrefix: getlabel('urls.slug-prefix', 'en'),
        common: common_en,
        homeContent: home_en,
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
      availableCountries,
      lang,
      pages,
      blogs,
      slugPrefix,
      common,
      homeContent,
    } of languages) {
      const collections = vendureNL.unflatten(allCollections);
      const navbarCollections = collections.map(mapToMinimalCollection);
      const pageLinks = pages.map(mapToMinimalPage);
      const blogPageLinks = blogs.map(mapToMinimalBlogPage);

      // Breadcrumb pages
      const Home = `${slugPrefix}/`;

      const global = {
        navbarCollections,
        lang,
        cartUrl: `${slugPrefix}/cart/`,
        checkoutUrl: `${slugPrefix}/checkout/`,
        homeUrl: `${slugPrefix}/`,
        common,
        pageLinks,
      };

      const popularProducts = products.slice(0, 5);
      const popularCollections = collections.slice(0, 6);

      // ----------------- Search ---------------------
      const searchProducts = products.map((p) => ({
        ...p,
        collections:
          getProductCollections(productsPerCollection, allCollections, p.id) ||
          [],
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
      fs.writeFileSync(
        `./static/_${lang}_search.json`,
        JSON.stringify(indexObject)
      );

      // -------------------- Home -----------------------------------
      createPage({
        path: global.homeUrl,
        component: './src/templates/Index.vue',
        context: {
          ...global,
          popularProducts,
          popularCollections,
          blogs: blogPageLinks.slice(0, 10),
          homeContent,
        },
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
            popularProducts,
          },
        });
      });

      // -------------------- ProductListing -----------------------------------
      productsPerCollection.forEach(
        ({ products: directProducts, collection }) => {
          const translatedPages = {};
          languages.forEach((language) => {
            let translatedCollection = language.collections.find(
              (c) => c.id == collection.id
            );
            translatedPages[language.lang] = translatedCollection.url;
          });
          const breadcrumb = {
            Home,
            [collection.name]: collection.url,
          };
          let childCollections = [];
          const childProducts = []; // products of childCollections
          collection.children?.forEach((childCol) => {
            const childCollectionMap = productsPerCollection.find(
              ({ collection: colWithProducts }) =>
                colWithProducts.id == childCol.id
            );
            if (childCollectionMap) {
              childCollections.push(childCollectionMap.collection);
              childProducts.push(...childCollectionMap.products);
            }
          });
          createPage({
            path: collection.url,
            component: './src/templates/ProductListing.vue',
            context: {
              ...global,
              breadcrumb,
              collection,
              translatedPages,
              childCollections:
                childCollections.length > 0
                  ? childCollections.map(mapToMinimalCollection)
                  : undefined,
              products: directProducts.concat(childProducts), // Merge direct products and childProducts
            },
          });
        }
      );

      // -------------------- Cart -----------------------------------
      const cartTranslations = {};
      languages.forEach(({ lang, slugPrefix }) => {
        cartTranslations[lang] = `${slugPrefix}/cart/`;
      });
      createPage({
        path: global.cartUrl,
        component: './src/templates/Cart.vue',
        context: {
          ...global,
          popularCollections,
          translatedPages: cartTranslations,
        },
      });

      // -------------------- Checkout -----------------------------------
      const checkoutTranslations = {};
      languages.forEach(({ lang, slugPrefix }) => {
        checkoutTranslations[lang] = `${slugPrefix}/checkout/`;
      });
      createPage({
        path: global.checkoutUrl,
        component: './src/templates/Checkout.vue',
        context: {
          ...global,
          availableCountries,
          translatedPages: checkoutTranslations,
        },
      });

      // -------------------- Order confirmation -----------------------------------
      createPage({
        path: `${slugPrefix}/order/:code`,
        component: './src/templates/OrderConfirmation.vue',
        context: {
          ...global,
          hideLanguageSwitcher: true, // Language is chosen based on the shipping country
        },
      });
    }
  });
};
