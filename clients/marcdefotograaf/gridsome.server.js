module.exports = async function (api) {
  api.createPages(async ({ createPage, graphql }) => {
    // ----------------- Index ---------------------
    createPage({
      path: '/',
      component: './src/templates/Index.vue',
      context: {},
    });
  });
};
