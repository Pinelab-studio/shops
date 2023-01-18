const { GET_CONTENT } = require('./content.queries');
const { VendureServer } = require('pinelab-storefront');
const { GraphQLClient } = require('graphql-request');

module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    const vendureServer = new VendureServer(
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    const directus = new GraphQLClient(
      `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
    );

    const [
      { products, collections, productsPerCollection, availableCountries },
      {
        supera_algemeen: global,
        supera_home: home,
        supera_news: news,
        supera_projects: projects,
        supera_biography: bio,
        supera_terms_conditions: terms,
      },
    ] = await Promise.all([
      vendureServer.getShopData(),
      directus.request(GET_CONTENT),
    ]);

    products.reverse();

    const featuredProducts = products.filter((p) =>
      p.facetValues.find((value) => value.code === 'featured')
    );

    projects.sort((p1, p2) => {
      p1.datum = p1.datum ? new Date(p1.datum) : new Date(0);
      p2.datum = p2.datum ? new Date(p2.datum) : new Date(0);
      return p2.datum.getTime() - p1.datum.getTime();
    });

    // Breadcrumb pages
    const Home = '/';
    const Shop = '/shop/';
    const Cart = '/cart/';
    const Checkout = '/checkout/';
    const Portfolio = '/portfolio/';
    const Bio = '/bio/';
    const Contact = '/contact/';

    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {
        global,
        home,
        news,
        products,
        collections,
        featuredProducts,
      },
    });

    // ----------------- Shop ---------------------
    createPage({
      path: '/shop/',
      component: './src/templates/Shop.vue',
      context: {
        global,
        products,
        collections,
        breadcrumb: { Home, Shop },
      },
    });

    // ----------------- ProductDetail ---------------------
    products.forEach((product) => {
      createPage({
        path: `/shop/product/${product.slug}`,
        component: './src/templates/Product.vue',
        context: {
          global,
          product,
          breadcrumb: { Home, Shop, [product.name]: product.slug },
        },
      });
    });

    // ----------------- Portfolio ---------------------
    const featuredProjects = projects.filter((p) => p.featured);
    const projectsPerCategory = new Map();
    projects.forEach((project) =>
      project.categories.forEach((category) => {
        const existingProjects = projectsPerCategory.get(category) || [];
        existingProjects.push(project);
        projectsPerCategory.set(category, existingProjects);
      })
    );
    const categories = Array.from(projectsPerCategory.keys());

    createPage({
      path: '/portfolio/',
      component: './src/templates/Portfolio.vue',
      context: {
        global,
        categories,
        projects: featuredProjects,
        breadcrumb: { Home, Portfolio },
      },
    });

    // ----------------- Portfolio categories---------------------
    projectsPerCategory.forEach((projects, category) => {
      createPage({
        path: `/portfolio/${category}`,
        component: './src/templates/Projects.vue',
        context: {
          global,
          category,
          projects,
          breadcrumb: {
            Home,
            Portfolio,
            [category]: `/portfolio/${category}`,
          },
        },
      });
    });

    // ----------------- Bio ---------------------
    createPage({
      path: '/bio/',
      component: './src/templates/Bio.vue',
      context: {
        global,
        bio,
        breadcrumb: { Home, Bio },
      },
    });

    // ----------------- Contact ---------------------
    createPage({
      path: '/contact/',
      component: './src/templates/Contact.vue',
      context: {
        global,
        breadcrumb: { Home, Contact },
      },
    });

    // ----------------- Terms ---------------------
    createPage({
      path: '/terms-conditions-and-privacy-policy/',
      component: './src/templates/Terms.vue',
      context: {
        global,
        terms,
        breadcrumb: {
          Home,
          ['Terms, conditions and privacy policy']:
            '/terms-conditions-and-privacy-policy/',
        },
      },
    });

    // ----------------- Cart ---------------------
    createPage({
      path: '/cart/',
      component: './src/templates/Cart.vue',
      context: {
        global,
        breadcrumb: { Home, Shop, Cart },
      },
    });

    // ----------------- Checkout ---------------------
    createPage({
      path: '/checkout/',
      component: './src/templates/Checkout.vue',
      context: { global, availableCountries },
    });

    // ----------------- Order confirmation ------------
    createPage({
      path: '/order/:code',
      component: './src/templates/Order.vue',
      context: { global },
    });

    // Under construction
    createPage({
      path: '/under-construction/',
      component: './src/templates/UnderConstruction.vue',
    });
  });
};
