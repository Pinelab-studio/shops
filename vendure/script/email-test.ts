import {
  bootstrap,
  ChannelService,
  Injector,
  RequestContext,
} from '@vendure/core';
import { config } from '../src/vendure-config';
import { EmailUtil } from '../src/email/email.util';
import { ModuleRef } from '@nestjs/core';

(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  const mod = await app.get(ModuleRef);
  const channel = await app.get(ChannelService).getDefaultChannel();
  const ctx = new RequestContext({
    apiType: 'admin',
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel,
  });
  const emails = await EmailUtil.getAdminEmailAddressesForChannel(
    new Injector(mod),
    ctx
  );
  console.log(emails);
  process.exit(0);
})();
