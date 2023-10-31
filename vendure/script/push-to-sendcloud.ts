import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { GoedgepicktService } from '@pinelab/vendure-plugin-goedgepickt/dist/vendure-plugin-goedgepickt/src/api/goedgepickt.service';
import { SendcloudService } from '@pinelab/vendure-plugin-sendcloud/dist/vendure-plugin-sendcloud/src/api/sendcloud.service';

// Use like yarn script:prod script/push-to-sendcloud.ts __default_channel__ 6ENWC7GRJWYCAQXN
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const app = await bootstrap(require('../src/vendure-config').config);
  const channelToken = process.argv[2];
  const code = process.argv[3];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const scService = await app.get(SendcloudService);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const order = await app.get(OrderService).findOneByCode(ctx, code);
  if (!order) {
    throw Error(`no order found with code ${code}`);
  }
  await scService.createOrderInSendcloud(ctx, order);
  console.log(`Pushed ${code} to sendcloud`);
  process.exit(0);
})();
