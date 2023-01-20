# Vendure backend
This directory holds the Vendure backend for the Pinelab Shops platform.

## Development

```
yarn serve:test
// or production
yarn serve:prod
```

## How to upgrade Vendure version
1. Create a new branch like `feat/vendure-1.7.1`
2. Upgrade all Vendure plugins to their latest version
3. Run `yarn upgrade --pattern @vendure --latest` to upgrade the Vendure packages
4. Create a Pull Request to `develop`
5. Merge PR after checks succeeded
6. Wait for `develop` to be deployed to Test (See GitHub actions)
7. Checkout `develop` locally and `git pull`
8. `cd packages/e2e`
9. Run `yarn nightwatch:e2e` to run the e2e test against the Test environment
10. If the e2e tests succeed, create a PR to merge `develop` into `master`
11. Merge PR when checks succeeded. 

## Migrations

[Migrations](https://www.vendure.io/docs/developer-guide/migrations/) allow safe updates to the database schema.

The following npm scripts can be used to generate migrations:

```
yarn migration:generate [name]
```

run any pending migrations that have been generated:

```
yarn migration:run
```

and revert the most recently-applied migration:

```
yarn migration:revert
```

### Copying prod DB to test
```bash 
# https://console.cloud.google.com/transfer/cloud/jobs

mysqldump --column-statistics=0 -u username123 -h 1.1.1.1 -p prod-db-naame > prod.sql
mysql -u username123 -h 1.1.1.1 -p test < prod.sql
```