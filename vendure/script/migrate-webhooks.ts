import { bootstrap, ChannelService, RequestContext } from '@vendure/core';
import { WebhookService } from '@pinelab/vendure-plugin-webhook/dist/api/webhook.service';

// Add your hook URL's and channel ID's here
const webhooks = [
  {
    hook: 'https://api.netlify.com/build_hooks/63d26f1c6db1aa46d75cfc4c',
    channelToken: 'wkw-default',
  },
];

/**
 * This script creates webhooks for the given channel for all defined events in the DB.
 */
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);

  for (const webhook of webhooks) {
    const channel = await app
      .get(ChannelService)
      .getChannelFromToken(webhook.channelToken);
    const ctx = new RequestContext({
      apiType: 'admin',
      authorizedAsOwnerOnly: false,
      channel,
      isAuthorized: true,
    });
    await app.get(WebhookService).saveWebhooks(ctx, [
      {
        event: 'ProductEvent',
        url: webhook.hook,
      },
      {
        event: 'ProductVariantChannelEvent',
        url: webhook.hook,
      },
      {
        event: 'ProductVariantEvent',
        url: webhook.hook,
      },
      {
        event: 'CollectionModificationEvent',
        url: webhook.hook,
      },
      {
        event: 'CollectionEvent',
        url: webhook.hook,
      },
    ]);
    console.log(
      `Created webhooks for channel ${webhook.channelToken} to ${webhook.hook}}`
    );
  }

  // Done
  process.exit(0);
})();
