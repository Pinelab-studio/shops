require('dotenv').config({ path: process.env.ENV_FILE });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { config, runningInWorker, runningLocal } from './vendure-config';

bootstrap(config)
  .then(async (app) => {
    if (runningInWorker || runningLocal) {
      // Start worker if running in worker or running locally
      Logger.info(`Started JobQueueService ${process.env.SHOP_ENV}`);
      await app.get(JobQueueService).start();
    }
    Logger.info(`Bootstrapped Vendure for env ${process.env.SHOP_ENV}`);
  })
  .catch((err) => {
    console.error(err);
  });
