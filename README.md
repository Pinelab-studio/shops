[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Pinelab Shop platform

This repository holds all components needed to run the Pinelab Shops multi-tenant e-commerce platform.

* `vendure` the Vendure backend.
* `clients/*` holds the client specific storefronts
* `packages/e2e` e2e test to test basic functionality on minishop.studio demo shop
* `packages/pinelab-storefront` Frontend library used in all storefronts, based on Buefy (Bulma)

## Storefront Development

1. Run `nvm use 16`, because Gridsome depends on node 16 unfortunately
2. Run `yarn` in the root of the project
3. Run `yarn bootstrap` in the root to build all dependencies
5. Go to `clients/wkw` for example, and run `yarn gridsome develop` to start the wormenkwekerijwasse.nl storefront locally. It will fetch data from the deployed Vendure instance.


### `packages/pinelab-storefront` development
:warning: Most of the checkout for all clients is packaged in `packages/pinelab-storefront`. To develop in that package with live reloading, run the following:

1. Run `yarn watch` inside `packages/pinelab-storefront`. This will recompile the pinelab-storefront files
2. Run `yarn gridsome develop` like you normally would in one of the `clients/*` folders. This will use the compile files from `packages/pinelab-storefront/lib/*`

:warning: Changes to `pinelab-storefront` will affect all clients!