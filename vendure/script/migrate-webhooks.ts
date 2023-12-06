import { bootstrap, ChannelService, RequestContext } from '@vendure/core';
import { WebhookService } from '@pinelab/vendure-plugin-webhook/dist/api/webhook.service';

// Add your hook URL's and channel ID's here
const webhooks = [
  {
    hook: 'https://api.netlify.com/build_hooks/6005a299fc21bd367da1a835',
    channelToken: 'danielvdhaterd',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/6013cf7136a65b9b9f5d8026',
    channelToken: 'marcdefotograaf',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/60646bd4b00f212e7fc4a521',
    channelToken: 'lab07',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/621f1abc52520c733273f90e',
    channelToken: 'super-a',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/622b1376c042b8487e8e36f2',
    channelToken: 'cryptherion',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/6315a3b36702a7141b89dd1d',
    channelToken: 'cantastic',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/628b2d9b065a4076cf60109e',
    channelToken: 'op',
  },
  {
    hook: 'https://api.netlify.com/build_hooks/655342711a7a8e41185d2512',
    channelToken: 'roy-schreuder',
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
