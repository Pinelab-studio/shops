// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Roy Schreuder',
  siteUrl: 'https://royschreuder.com',
  siteDescription:
    'Webshop en portfolio van street-artist Roy Schreuder uit Leeuwarden',
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
