// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

if (process.env.VENDURE_ENV === 'local') {
  process.env.GRIDSOME_VENDURE_API = process.env.GRIDSOME_VENDURE_API_LOCAL;
}

module.exports = {
  siteName: 'Wormenkwekerij Wasse',
  siteUrl: 'https://wormenkwekerijwasse.nl',
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
