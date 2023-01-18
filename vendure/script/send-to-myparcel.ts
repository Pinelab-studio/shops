require('dotenv').config({ path: process.env.ENV_FILE });
import { MyparcelService } from 'vendure-plugin-myparcel/dist/api/myparcel.service';
import {
  bootstrap,
  ChannelService,
  OrderService,
  RequestContext,
} from '@vendure/core';
import { config } from '../src/vendure-config';

// Use like yarn script:prod script/send-to-myparcel.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
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
  console.log(`Sending order ${orderCode} to MyParcel`);
  const order = await app.get(OrderService).findOneByCode(ctx, orderCode);
  if (!order) {
    throw Error('Order not found');
  }
  await app.get(MyparcelService).createShipments(channelToken, [order!]);
  console.log(`Sent ${order?.code}`);
  process.exit(0);
})();
