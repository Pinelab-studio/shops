import { GoedgepicktService } from '@pinelab/vendure-plugin-goedgepickt/dist/vendure-plugin-goedgepickt/src/api/goedgepickt.service';
import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';

// Use like yarn script:prod script/send-to-goedgepickt.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const channelToken = process.argv[2];
  const orderCodes = process.argv.slice(3);
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);

  for (const orderCode of orderCodes) {
    const ctx = new RequestContext({
      apiType: 'admin',
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
    });
    console.log(`Sending order ${orderCode} to Goedgepickt`);
    const order = await app.get(OrderService).findOneByCode(ctx, orderCode);
    if (!order) {
      throw Error('Order not found');
    }
    await app.get(GoedgepicktService).syncOrder(ctx, order.code);
    console.log(`Sent ${order?.code}`);
  }

  process.exit(0);
})();
