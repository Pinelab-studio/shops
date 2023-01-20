import {
  bootstrap,
  Channel,
  ChannelService,
  CurrencyCode,
  LanguageCode,
  PaymentMethodService,
  Permission,
  RequestContext,
  RoleService,
  ShippingMethodService,
  ZoneService,
} from '@vendure/core';
import prompt from 'prompt';
import { ChannelResolver } from '@vendure/core/dist/api/resolvers/admin/channel.resolver';

/**
 * Create a channel with default role
 */
const defaultPermissions: Permission[] = [];
defaultPermissions.push(
  Permission.CreateCatalog,
  Permission.ReadCatalog,
  Permission.UpdateCatalog,
  Permission.DeleteCatalog
);
defaultPermissions.push(
  Permission.CreateAsset,
  Permission.ReadAsset,
  Permission.UpdateAsset,
  Permission.DeleteAsset
);
defaultPermissions.push(
  Permission.CreateCollection,
  Permission.ReadCollection,
  Permission.UpdateCollection,
  Permission.DeleteCollection
);
defaultPermissions.push(Permission.ReadCountry);
defaultPermissions.push(
  Permission.CreateCustomer,
  Permission.ReadCustomer,
  Permission.UpdateCustomer,
  Permission.DeleteCustomer
);
defaultPermissions.push(
  Permission.CreateCustomerGroup,
  Permission.ReadCustomerGroup,
  Permission.UpdateCustomerGroup,
  Permission.DeleteCustomerGroup
);
defaultPermissions.push(
  Permission.CreateFacet,
  Permission.ReadFacet,
  Permission.UpdateFacet,
  Permission.DeleteFacet
);
defaultPermissions.push(
  Permission.CreateOrder,
  Permission.ReadOrder,
  Permission.UpdateOrder,
  Permission.DeleteOrder
);
defaultPermissions.push(
  Permission.CreatePaymentMethod,
  Permission.ReadPaymentMethod,
  Permission.UpdatePaymentMethod,
  Permission.DeletePaymentMethod
);
defaultPermissions.push(
  Permission.CreateProduct,
  Permission.ReadProduct,
  Permission.UpdateProduct,
  Permission.DeleteProduct
);
defaultPermissions.push(
  Permission.CreatePromotion,
  Permission.ReadPromotion,
  Permission.UpdatePromotion,
  Permission.DeletePromotion
);
defaultPermissions.push(
  Permission.CreateShippingMethod,
  Permission.ReadShippingMethod,
  Permission.UpdateShippingMethod,
  Permission.DeleteShippingMethod
);
defaultPermissions.push(
  Permission.CreateTag,
  Permission.ReadTag,
  Permission.UpdateTag,
  Permission.DeleteTag
);
defaultPermissions.push(Permission.ReadTaxCategory);
defaultPermissions.push(Permission.ReadTaxRate);
defaultPermissions.push(Permission.ReadZone);

(async () => {
  require('dotenv').config({ path: process.env.ENV_FILE });
  const { config } = require('../src/vendure-config');
  const app = await bootstrap(config);
  // Prompt input
  const schema = {
    properties: {
      channelName: {
        pattern: /^[a-z0-9\-]+$/,
        message:
          'Name must be only lowercase letters,dashes or numbers. Name can be changed via UI later',
        required: true,
      },
    },
  };
  console.log(`Creating in ${process.env.DATABASE_NAME}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  prompt.start();
  const { channelName }: { channelName: string } = await prompt.get(schema);
  // Create channel
  const channelResolver = app.get(ChannelResolver);
  const channelService = app.get(ChannelService);
  const zoneService = app.get(ZoneService);
  const roleService = app.get(RoleService);
  const paymentMethodService = app.get(PaymentMethodService);
  const shippingService = app.get(ShippingMethodService);
  const defaultChannel = await channelService.getDefaultChannel();
  let ctx = new RequestContext({
    channel: defaultChannel,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
    isAuthorized: true,
  });
  const nl = (await zoneService.findAll(ctx)).find(
    (zone) => zone.name === 'NL'
  );
  if (!nl) {
    throw Error(`Unable to find zone NL. Cannot create channel`);
  }
  const channel = (await channelResolver.createChannel(ctx, {
    input: {
      code: channelName,
      token: channelName,
      currencyCode: CurrencyCode.EUR,
      defaultLanguageCode: LanguageCode.en,
      defaultShippingZoneId: nl.id,
      defaultTaxZoneId: nl.id,
      pricesIncludeTax: true,
    },
  })) as Channel;
  if (!channel.code) {
    console.error(channel);
    throw Error(`Failed to create channel`);
  }
  console.log(`Created channel ${channel.code}`);
  // Create role. Hack, because creating roles via code results in forbidden error
  const role = await (roleService as any).createRoleForChannels(
    ctx,
    {
      code: `${channelName}-admin`,
      description: `${channelName} admin`,
      permissions: defaultPermissions,
      channelIds: [channel.id],
    },
    [channel]
  );
  console.log(`Created role ${role.description}`);
  // Create Mollie payment in created channel
  ctx = new RequestContext({
    channel,
    authorizedAsOwnerOnly: false,
    apiType: 'admin',
    isAuthorized: true,
  });
  const mollie = await paymentMethodService.create(ctx, {
    code: `mollie-payment-${channelName}`,
    name: `mollie-payment-${channelName}`,
    enabled: true,
    handler: {
      code: 'mollie-payment-handler',
      arguments: [
        {
          name: 'apiKey',
          value: 'Vul hier je apiKey in',
        },
        {
          name: 'redirectUrl',
          value: 'https://minishop.studio/order',
        },
      ],
    },
  });
  console.log(`Created Mollie paymentmethod: ${mollie.code}`);
  const shippingMethod = await shippingService.create(ctx, {
    code: `${channelName}-verzenden`,
    translations: [{ languageCode: LanguageCode.en, name: 'Verzenden' }],
    calculator: {
      code: 'tax-based-calculator',
      arguments: [
        {
          name: 'rate',
          value: '480',
        },
      ],
    },
    checker: {
      code: 'default-shipping-eligibility-checker',
      arguments: [
        {
          name: 'orderMinimum',
          value: '0',
        },
      ],
    },
    fulfillmentHandler: 'manual-fulfillment',
  });
  console.log(`Created default shippingmethod: ${shippingMethod.code}`);
  console.log(`🌲 All done. Don't forget to create a user via the Admin UI`);
  process.exit(0);
})();
