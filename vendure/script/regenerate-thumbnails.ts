import {
  Asset,
  bootstrap,
  ChannelService,
  ConfigService,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';
import { GoogleStorageStrategy } from '@pinelab/vendure-plugin-google-storage-assets';
import * as tmp from 'tmp';

/**
 * Regenerates ALL thumbnails for ALL channels
 */
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const assets = await app
    .get(TransactionalConnection)
    .rawConnection.getRepository(Asset)
    .find();
  console.log(`Regenerating ${assets.length} thumbnails for all channels`);
  const googleStrategy = app.get(ConfigService).assetOptions
    .assetStorageStrategy as GoogleStorageStrategy;
  let counter = 0;
  for (const asset of assets) {
    try {
      const tmpFile = tmp.fileSync();
      await googleStrategy.storage
        .bucket(googleStrategy.bucketName)
        .file(asset.preview)
        .download({ destination: tmpFile.name });
      await googleStrategy.writeThumbnail(asset.preview, tmpFile.name);
      counter++;
      console.log(`Generated thumbnail for ${asset.preview}`);
    } catch (e: unknown) {
      console.error(`Failed to generate thumbnail for ${asset.preview}: ${e}`);
    }
  }
  console.log(`Regenerated ${counter} thumbnails of ${assets.length} assets`);
  process.exit(0);
})();
