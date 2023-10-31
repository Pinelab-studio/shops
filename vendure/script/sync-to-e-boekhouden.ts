import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { EBoekhoudenService } from '@pinelab/vendure-plugin-e-boekhouden/dist/api/e-boekhouden.service';

// Use like yarn script:prod script/send-to-goedgepickt.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const channelToken = process.argv[2];
  const orderCode = process.argv[3];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });

  if (!orderCode) {
    const date = '2022-12-06T09:50:34+00:00';
    console.log(`Syncing all orders placed after ${date} to e-boekhouden`);
    let orders = await app.get(OrderService).findAll(ctx, {
      filter: {
        orderPlacedAt: {
          after: date,
        },
      },
    });
    for (const order of orders.items) {
      await app
        .get(EBoekhoudenService)
        .pushOrder({ orderCode: order.code, channelToken });
      console.log(`Sent order ${order.code} to Eboekhouden`);
    }
    console.log(`Synced ${orders.items.length} orders to e-boekhouden`);
  } else {
    await app.get(EBoekhoudenService).pushOrder({ orderCode, channelToken });
    console.log(`Sent order ${orderCode} to Eboekhouden`);
  }

  process.exit(0);
})();
