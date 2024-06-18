import { ModuleRef } from '@nestjs/core';
import {
  ChannelService,
  Injector,
  RequestContextService,
  bootstrap,
} from '@vendure/core';
import { assignAllProductsToChannel } from '@pinelab/vendure-scripts';
import { getSuperadminContext } from '@vendure/testing/lib/utils/get-superadmin-context';

/**
 * Assign all products from one channel to another.
 */
require('dotenv').config({ path: process.env.ENV_FILE }); // Always load env first, then config file
import('../src/vendure-config').then(async ({ config }) => {
  const app = await bootstrap(config);

  const sourceChannel = await app
    .get(ChannelService)
    .getChannelFromToken('cantastic');
  const targetChannel = await app
    .get(ChannelService)
    .getChannelFromToken('cantastic-wholesale');
  const injector = new Injector(app.get(ModuleRef));
  const ctx = await getSuperadminContext(app);
  console.log(
    `[${process.env.APP_ENV}] Assigning all products from ${sourceChannel.code} to ${targetChannel.code}`
  );

  await assignAllProductsToChannel(
    sourceChannel.id,
    targetChannel.id,
    injector,
    ctx
  );

  await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for any background tasks or jobs
  process.exit(0);
});
