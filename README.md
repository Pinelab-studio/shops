[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Pinelab Shop platform

This repository holds all components needed to run the Pinelab Shops multi-tenant e-commerce platform.

* `vendure` the Vendure backend.
* `clients/*` holds the client specific storefronts
* `packages/e2e` e2e test to test basic functionality on minishop.studio demo shop
* `packages/pinelab-storefront` Frontend library used in all webshop frontends based on Buefy (Bulma)

## Storefront Development

1. Run `nvm use 16`, because Gridsome depends on node 16 unfortunately
2. Run `yarn` in the root of the project
3. Run `yarn bootstrap` to build all dependencies
4. Go to `clients/wkw` for example, and run `yarn gridsome develop` to start the wormenkwekerijwasse.nl storefront locally. It will fetch data from the deployed Vendure instance.


### `packages/pinelab-storefront` development
:warning: Most of the checkout for all clients is packaged in `packages/pinelab-storefront`. Whenever you need to develop something in that package, before publishing, follow these steps:

1. Run `yarn dev` inside a clients directory. This will link `packages/pinelab-storefront` to the client project you are working on
2. Whenever you change anything in `packages/pinelab-storefront/src/*` it will be rebuild
3. After merging your PR, you need to checkout `master` and run `yarn lerna:publish` to publish `pinelab-storefront` and install it in all client projects in `clients/*`

:warning: Changes to `pinelab-storefront` will affect all clients!