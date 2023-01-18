// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Daniël van de Haterd',
  siteUrl: 'https://dvandehaterd.nl',
  siteDescription:
    'Artist Daniël van de Haterd. Art adventures. Abstract artist with a graffiti background.',
  configureWebpack: {
    resolve: {
      symlinks: false, //npm link
    },
  },
  plugins: [
    {
      use: '@gridsome/plugin-sitemap',
    },
  ],
};
