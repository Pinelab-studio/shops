import {
  bootstrap,
  ChannelService,
  Order,
  OrderService,
  RequestContext,
} from '@vendure/core';

// Usage: yarn script:wkw-test script/cancel-orders __default_channel__
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
        eq: 'PaymentAuthorized',
      },
    },
  });
  console.log(`Canceling ${orders.items.length}`);
  for (const order of orders.items) {
    const res = await orderService.cancelOrder(ctx, {
      orderId: order.id,
      reason: 'Old authorized state not valid anymore',
      cancelShipping: true,
      lines: order.lines.map((l) => ({
        orderLineId: l.id,
        quantity: l.quantity,
      })),
    });
    if (!(res as Order).code) {
      console.error(`Failed to cancel ${order.code}: ${JSON.stringify(res)}`);
    } else {
      console.log(`Canceled ${order.code}`);
    }
  }

  console.log(`Canceled ${orders.items.length} orders`);
  process.exit(0);
})();
