require('dotenv').config({ path: process.env.ENV_FILE });
import {
  bootstrap,
  JobQueueService,
  Logger,
  RequestContextCacheService,
} from '@vendure/core';
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

    // FIXME: Dirty hack to avoid caching of wrong 'activeTaxZone'. This patch makes sure get() never returns anything for activeTaxZone
    // This is due to a wrong cache setting in Vendure core. The commit below (v2.2.0) should fix this issue:
    // https://github.com/vendure-ecommerce/vendure/commit/e543e5e7006140518be311bc7e60687bd9b40778
    // Next block should be removed when upgraded to v2.2.0
    const requestContextCache = app.get(RequestContextCacheService);
    const originalGet = requestContextCache.get;
    requestContextCache.get = function (ctx, key, getDefault?: any) {
      if (key === 'activeTaxZone') {
        return getDefault?.();
      } else {
        return originalGet.call(requestContextCache, ctx, key, getDefault);
      }
    };
    Logger.error(
      `FIXME: remove this after v2.2.0: Patched RequestContextCacheService.get() to avoid caching of wrong 'activeTaxZone'`
    );
    // End of ugly patch block
  })
  .catch((err) => {
    console.error(err);
  });
