[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Pinelab Shop platform

This repository holds all components needed to run the Pinelab Shops multi-tenant e-commerce platform.

* `vendure` the Vendure backend.
* `clients/*` holds the client specific storefronts
* `packages/e2e` e2e test to test basic functionality on minishop.studio demo shop
* `packages/pinelab-storefront` Frontend library used in all webshop frontends based on Buefy (Bulma)


# Deployments
Steps to deploy a new version of the shops platform:
1. Make sure branch `develop` is up to date with `master`
2. Create a new feature branch from `develop`, something like `feat/new-vendure-version`
3. Create a PR, this will trigger Github Workflow tests
4. If the tests succeed, merge the PR
5. Wait until the deployment of `develop` is finished. After deployment the new version is live on the test environment.
6. Run `yarn nightwatch:e2e` to run the e2e test locally on your machine.
7. If the e2e test succeeds, you can create a PR to `master`
8. Wait for the tests to finish on the master branch PR as well
9. Merge the PR, wait for master deployment to finish, and smoke test the newly deployed instance.

# Pinelab principles

1. One fan a day: Try to do something unexpected every day for 1 customer of Pinelab to create a fanbase.
2. Keep it simple. You aren't going to need it. Don't implement it now because you assume you will need it later.
3. Write code for humans, not machines. Minor performance trade-offs are fine when they make your code more readable.
4. What is the impact of this new feature? Is it easily reverted? Will future code have to deal with it? Every addition takes a toll: be careful what you add, even when a client wants it.
5. 80/20 rule: If 80% of the clients can use it, implement it in the platform. Otherwise, separate it, charge more for it or just don't do it.
6. Make a developer happy: document in code (README, JsDoc), no one maintains external docs! You can even add images in Markdown...
7. Try to keep things stateless: avoid new database entities. Avoid cronjobs where possible