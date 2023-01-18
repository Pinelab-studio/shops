import {
  Asset,
  bootstrap,
  ChannelService,
  Facet,
  FacetValue,
  RequestContext,
} from '@vendure/core';
import { Connection } from 'typeorm';

/**
 * Script to add Facets, FacetValues and Assets to default channel. Needed after upgrading a Vendure 0.x DB to 1.X
 */
(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const channel = await app.get(ChannelService).getDefaultChannel();
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  for (const entity of [Facet, FacetValue, Asset]) {
    const entities = await app.get(Connection).getRepository(entity).find();
    await Promise.all(
      entities.map((e) => {
        return app
          .get(ChannelService)
          .assignToChannels(ctx, entity as any, e.id, [1]);
      })
    );
    console.log(`Added ${entities.length} ${entity.name}s to default channel`);
  }
  process.exit(0);
})();
