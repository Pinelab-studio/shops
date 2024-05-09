require('dotenv').config({ path: process.env.ENV_FILE });
import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { INestApplication } from '@nestjs/common';
import { config, runningInWorker, runningLocal } from './vendure-config';

export let app: INestApplication;

bootstrap(config)
  .then(async (_app) => {
    if (runningInWorker || runningLocal) {
      // Start worker if running in worker or running locally
      Logger.info(`Started JobQueueService ${process.env.SHOP_ENV}`);
      await _app.get(JobQueueService).start();
    }
    Logger.info(`Bootstrapped Vendure for env ${process.env.SHOP_ENV}`);
    app = _app;
  })
  .catch((err) => {
    console.error(err);
  });
