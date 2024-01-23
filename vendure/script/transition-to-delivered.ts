import {
  ChannelService,
  OrderService,
  RequestContext,
  bootstrap,
} from '@vendure/core';
import { transitionToDelivered } from '@pinelab/vendure-plugin-sendcloud/dist/util/src/order-state-util';
import { sendcloudHandler } from '@pinelab/vendure-plugin-sendcloud';

/**
 * Transition all Shipped orders to Delivered using the Sendcloud handler, after this bug was fixed: https://github.com/Pinelab-studio/pinelab-vendure-plugins/pull/332
 *
 * @example
 * yarn script:wkw-test script/transition-to-delivered.ts wkw-default
 */
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);

  const channelToken = process.argv[2];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  if (!channel) {
    throw new Error(`No channel with token "${channelToken}" found`);
  }
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const orderService = app.get(OrderService);
  // Get all orders with skip/take in batches
  let count = 0;
  let hasMore = true;
  let initialAmount: number | undefined = undefined;
  while (hasMore) {
    const { items, totalItems } = await orderService.findAll(ctx, {
      filter: {
        state: {
          eq: 'Shipped',
        },
      },
      take: 5,
    });
    if (initialAmount === undefined) {
      initialAmount = totalItems;
    }
    if (items.length === 0) {
      hasMore = false;
    }
    // Transition each order to Delivered
    await Promise.all(
      items.map(async (order, index) => {
        await transitionToDelivered(orderService, ctx, order, {
          code: sendcloudHandler.code,
          arguments: [],
        });
        count++;
        console.log(
          `Transitioned order ${order.code} to Delivered. (${count}/${initialAmount})`
        );
      })
    );
  }
})();
