require('dotenv').config({ path: process.env.ENV_FILE });
import { bootstrap } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { config } from '../src/vendure-config';
import { initialData } from './initial-data';

populate(() => bootstrap(config), initialData)
  .then((app) => {
    console.log('Populated');
    return app.close();
  })
  .then(
    () => process.exit(0),
    (err) => {
      console.log(err);
      process.exit(1);
    }
  );
