import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { transitionToDelivered } from 'vendure-plugin-sendcloud/dist/util/src';
import { sendcloudHandler } from 'vendure-plugin-sendcloud';

// Usage: yarn script:wkw-test script/complete-orders __default_channel__
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const app = await bootstrap(require('../src/vendure-config').config);
  const channelToken = process.argv[2];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const orderService = await app.get(OrderService);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const orders = await orderService.findAll(ctx, {
    filter: {
      state: {
        eq: 'PaymentSettled',
      },
      orderPlacedAt: {
        before: new Date('2023-01-23'),
      },
    },
  });
  console.log(`Completing ${orders.items.length}`);
  for (const order of orders.items) {
    await transitionToDelivered(orderService, ctx, order, {
      code: sendcloudHandler.code,
      arguments: [
        {
          name: 'trackingNumber',
          value: '-',
        },
      ],
    }).catch((e) => console.error(e));
    console.log(`Completed ${order.code}`);
  }
  console.log(`Completed ${orders.items.length} orders`);
  process.exit(0);
})();
