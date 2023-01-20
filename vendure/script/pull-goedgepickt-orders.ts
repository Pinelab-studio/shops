import { bootstrap, ChannelService, RequestContext } from '@vendure/core';
import { GoedgepicktService } from 'vendure-plugin-goedgepickt/dist/vendure-plugin-goedgepickt/src/api/goedgepickt.service';

// Use like yarn script:prod script/send-to-myparcel.ts bendeboef 6ENWC7GRJWYCAQXN
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const app = await bootstrap(require('../src/vendure-config').config);
  const channelToken = process.argv[2];
  const channel = await app
    .get(ChannelService)
    .getChannelFromToken(channelToken);
  const ggService = await app.get(GoedgepicktService);
  const client = await ggService.getClientForChannel(channelToken);
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const orders = await client.rawRequest({
    queryParams:
      'searchAttribute=status&searchDelimiter=%3D&searchValue=completed&perPage=50&createdAfter=2022-08-1700:00:00',
    method: 'GET',
    entity: 'orders',
  });
  console.log(`Found ${orders.items.length} orders`);
  for (const order of orders.items) {
    await ggService.updateOrderStatus(
      channelToken,
      order.externalId,
      order.status
    );
  }
  process.exit(0);
})();
