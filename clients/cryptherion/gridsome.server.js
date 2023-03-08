const { VendureServer } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');
const _ = require('lodash');
const { GET_CONTENT } = require('./content.queries');

/**
 * Optimizes a blog for card previews to save KB size
 */
function mapToMinimalBlog(blog) {
  return {
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    featured_image: blog.featured_image,
    date_created: blog.date_created,
    user_created: blog.user_created,
    summary: blog.summary,
  };
}

/**
 * Optimizes a collection for menu display to save KB size
 */
function mapToMinimalCollection(col) {
  return {
    id: col.id,
    slug: col.slug,
    name: col.name,
    featuredAsset: col.featuredAsset,
    parent: col.parent ? mapToMinimalCollection(col.parent) : undefined,
    children: col.children
      ? col.children.map(mapToMinimalCollection)
      : undefined,
  };
}

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
        cryptherion_blogs: blogs,
      },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    // Get toplevel collections
    const collections = vendureServer.unflatten(allCollections);

    const navbarBlogs = blogs.slice(0, 8).map(mapToMinimalBlog);
    const navbarCollections = collections.map(mapToMinimalCollection);
    const global = {
      telefoon,
      adres,
      email,
      banner,
      navbarBlogs,
      navbarCollections,
    };

    const featuredProduct = products.find((p) =>
      p.facetValues.find((value) => value.code === 'main-feature')
    );

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
      },
    });

    // ----------------- Blog overview ------------
    createPage({
      path: `/blog/`,
      component: './src/templates/BlogListing.vue',
      context: {
        global,
        blogs: blogs.map(mapToMinimalBlog),
      },
    });

    // ----------------- Blog details ------------
    blogs.forEach((blog) => {
      createPage({
        path: `/blog/${blog.slug}`,
        component: './src/templates/Blog.vue',
        context: {
          global,
          blog,
          relatedBlogs: blogs
            .filter((b) => b.id !== blog.id)
            .slice(0, 3)
            .map(mapToMinimalBlog),
        },
      });
    });

    // ------------------ 404 ---------------
    createPage({
      path: '/404',
      component: './src/templates/404.vue',
      context: { global },
    });

    // ----------------- Static pages ---------------------
    createPage({
      path: '/algemene-voorwaarden/',
      component: './src/templates/ContentPage.vue',
      context: {
        global,
        content: algemene_voorwaarden,
      },
    });
    createPage({
      path: '/privacy-beleid/',
      component: './src/templates/ContentPage.vue',
      context: {
        global,
        content: privacy_beleid,
      },
    });
    createPage({
      path: '/tot-snel/',
      component: './src/templates/UnderConstruction.vue',
      context: {
        global,
        content: `
      <h1>We zijn er even tussen uit. 1 mei zijn we er weer!</h1>
      `,
      },
    });
  });
};
