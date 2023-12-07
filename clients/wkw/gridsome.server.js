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
const { createProductFeed } = require('./create-product-feed');

module.exports = async function (api, options, context, ding) {
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
      wkw_paginas: allPages,
      wkw_blogs: allBlogs,
      wkw_reviews: reviews,
    } = await directus.request(GET_CONTENT);

    const pages_nl = allPages.filter((p) => p.language === 'nl');
    const pages_en = allPages.filter((p) => p.language === 'en');

    const blogs_nl = allBlogs.filter((b) => b.language === 'nl');
    const blogs_en = allBlogs.filter((b) => b.language === 'en');

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
        blogs,
        pages,
      }) => {
        const slugPrefix = getlabel('urls.slug-prefix', lang);
        const categoryPrefix = getlabel('urls.category-prefix', lang);
        const productPrefix = getlabel('urls.product-prefix', lang);
        const informationUrl = getlabel('urls.information', lang);
        pages.forEach((p) => setFullUrl(p, `${slugPrefix}`));
        blogs.forEach((b) => setFullUrl(b, `${informationUrl}`));
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
        informationUrl: `${slugPrefix}/${getlabel('urls.information', lang)}`,
        contactUrl: `${slugPrefix}/contact/`,
        common,
        pageLinks,
      };

      const popularProducts = products.slice(0, 5);
      const popularCollections = collections;

      // ----------------- Product Feed ---------------
      const feedUrl = `${lang}_product-feed.xml`;
      createProductFeed(api._app.config.siteUrl, products, feedUrl);

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
        `./static/_${lang}.search-cache.json`,
        JSON.stringify(indexObject)
      );

      // -------------------- Home / Index -----------------------------------
      const featured = products.filter((p) =>
        p.facetValues.find((facetValue) => facetValue.code === 'featured')
      );
      createPage({
        path: global.homeUrl,
        component: './src/templates/Index.vue',
        context: {
          ...global,
          popularProducts,
          popularCollections,
          blogs: blogPageLinks.slice(0, 10),
          homeContent,
          featuredProducts: featured.slice(0, 3),
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

      // ----------------- Blog pages ------------

      // Slugs from old website. We need these to reuse disquss threads
      const migratedComments = [
        'zieke_wormen_en_oplossingen',
        'zieke_wormen_en_oplossingen',
        'vrolijk_pasen_01',
        'wormentoren_in_de_winter',
        'beestjes_in_de_wormenbak',
        '3_jarig_jubileum',
        'compost_maken',
        'plastic_in_koffiepads',
        'groene_passie_beurs_2018',
        'buxus_mot_bestrijden',
        'landleven',
        'heermoes_verantwoordt_bestrijden',
        'wormen_courant_q_1_2018',
        'wormer_courant_q3_van_oktober',
        'meelwormen',
        'compostwormen_op_de_televisie',
        'baby_knoflook_oogst',
        'wormencompost_vermicompost_wormenmest',
        'vrolijk_pasen',
        'wormen_kweken_78',
        'een_axolotl_die_het_wormpje_wel_ziet_zitten',
        'wormen_viswormen_en_compostwormen_bewaren',
        'viswormen_of_compostwormen_en_uitleg_verpakkings_keuze',
        'wormen_in_de_zomer',
      ];

      blogs.forEach((blog) => {
        let disqusSlug;
        const oldSlugFormat = blog.slug.split('-').join('_');
        if (migratedComments.indexOf(oldSlugFormat) > -1) {
          disqusSlug = oldSlugFormat;
        }
        const translatedBlogs = {};
        languages.forEach((language) => {
          let translatedBlog = language.blogs.find((b) => b.name === blog.name);
          translatedBlogs[language.lang] = translatedBlog.url;
        });
        const informationUrlTitle = getlabel('nav.advice', lang);
        const breadcrumb = {
          Home,
          [informationUrlTitle]: global.informationUrl,
          [blog.titel]: '', // Not clickable anyway
        };
        createPage({
          path: blog.url,
          component: './src/templates/BlogPage.vue',
          context: {
            ...global,
            blog,
            disqusSlug,
            breadcrumb,
            translatedPages: translatedBlogs,
          },
        });
      });

      // -------------------- BlogOverview -----------------------------------
      const informationTranslations = {};
      languages.forEach(({ lang, slugPrefix }) => {
        informationTranslations[lang] = `${slugPrefix}/${getlabel(
          'urls.information',
          lang
        )}/`;
      });
      createPage({
        path: global.informationUrl,
        component: './src/templates/BlogOverview.vue',
        context: {
          ...global,
          blogs: blogPageLinks,
          translatedPages: informationTranslations,
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

        const collection = getProductCollections(
          productsPerCollection,
          allCollections,
          product.id
        )?.[0];
        const breadcrumb = {
          Home,
        };
        if (collection) {
          breadcrumb[collection.name] = collection.url;
        }
        breadcrumb[product.name] = product.url;

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
          // Merge direct products and childProducts
          const allproductsInCollection = directProducts.concat(childProducts);
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
              products: allproductsInCollection,
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

      // -------------------- Faq -----------------------------------
      const faqTranslations = {};
      languages.forEach(({ lang, slugPrefix }) => {
        faqTranslations[lang] = `${slugPrefix}/faq/`;
      });
      createPage({
        path: `${slugPrefix}/faq`,
        component: './src/templates/Faq.vue',
        context: {
          ...global,
          translatedPages: faqTranslations,
        },
      });

      // -------------------- ContactPage -----------------------------------
      const contactTranslations = {};
      languages.forEach(({ lang, slugPrefix }) => {
        contactTranslations[lang] = `${slugPrefix}/contact/`;
      });
      createPage({
        path: `${slugPrefix}/contact`,
        component: './src/templates/ContactPage.vue',
        context: {
          ...global,
          translatedPages: contactTranslations,
        },
      });

      // -------------------- 404 -----------------------------------
      createPage({
        path: `${slugPrefix}/404/`,
        component: './src/templates/404.vue',
        context: {
          ...global,
          popularProducts,
        },
      });
    }
  });
};
