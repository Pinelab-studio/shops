import { InvoiceService } from '@pinelab/vendure-plugin-invoices';
import { bootstrap, ChannelService, RequestContext } from '@vendure/core';

// Use like yarn script:prod script/generate-invoice.ts bendeboef 6ENWC7GRJWYCAQXN
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
    console.log(`Generating invoice for order ${orderCode}`);
    await app
      .get(InvoiceService)
      .createAndSaveInvoice(ctx.channel.token, orderCode);
    console.log(`Generated invoice for ${orderCode}`);
  }

  process.exit(0);
})();
