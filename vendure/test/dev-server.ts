import {
  createTestEnvironment,
  registerInitializer,
  SimpleGraphQLClient,
  SqljsInitializer,
  testConfig,
  TestServer,
} from '@vendure/testing';
import {
  ChannelService,
  CurrencyCode,
  DefaultLogger,
  DefaultSearchPlugin,
  defaultShippingCalculator,
  InitialData,
  LanguageCode,
  LogLevel,
  mergeConfig,
  PaymentMethodHandler,
  RequestContext,
  ShippingMethodService,
} from '@vendure/core';
import { PlaceOrderOnSettlementStrategy } from '../src/order/place-order-on-settlement.strategy';
import { InvoicePlugin, LocalFileStrategy } from 'vendure-plugin-invoices';
import { TaxInvoiceStrategy } from '../src/invoice/tax-invoice-strategy';
import { OrderExportPlugin } from 'vendure-plugin-order-export';
import { EmailPlugin } from '@vendure/email-plugin';
import { orderConfirmationHandler } from '../src/email/order-confirmation.handlers';
import path from 'path';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { GoogleStoragePlugin } from 'vendure-plugin-google-storage-assets/dist/google-storage-plugin';
import { GoedgepicktPlugin } from 'vendure-plugin-goedgepickt';
import { LimitVariantPerOrderPlugin } from 'vendure-plugin-limit-product-per-order';
import { TaxExportStrategy } from '../src/export/tax-export-strategy';
import { ProductsSoldExportStrategy } from '../src/export/products-sold-export-strategy';
import { MetricsPlugin } from 'vendure-plugin-metrics';
import { EBoekhoudenPlugin } from 'vendure-plugin-e-boekhouden';
import { EBookPlugin } from '../src/e-book/e-book.plugin';

const testPaymentMethod = new PaymentMethodHandler({
  code: 'test-payment-method',
  description: [
    { languageCode: LanguageCode.en, value: 'Test Payment Method' },
  ],
  args: {},
  createPayment: (ctx, order, amount, args, metadata) => {
    return {
      amount,
      state: 'Settled',
      transactionId: '12345',
      metadata: { public: metadata },
    };
  },
  settlePayment: () => ({
    success: true,
  }),
});

const initialData: InitialData = {
  defaultLanguage: LanguageCode.en,
  defaultZone: 'NL',
  taxRates: [
    { name: 'Standard Tax', percentage: 21 },
    { name: 'Reduced Tax', percentage: 9 },
    { name: 'Zero Tax', percentage: 0 },
  ],
  shippingMethods: [
    { name: 'default shipping', price: 500 },
    { name: 'shipping by zone', price: 600 },
  ],
  paymentMethods: [
    {
      name: testPaymentMethod.code,
      handler: { code: testPaymentMethod.code, arguments: [] },
    },
  ],
  countries: [{ name: 'Nederland', code: 'NL', zone: 'NL' }],
  collections: [
    {
      name: 'Electronics',
      filters: [
        {
          code: 'facet-value-filter',
          args: { facetValueNames: ['electronics'], containsAny: false },
        },
      ],
    },
  ],
};

export type TestEnv = {
  adminClient: SimpleGraphQLClient;
  shopClient: SimpleGraphQLClient;
  server: TestServer;
};
export async function startDevServer(): Promise<TestEnv> {
  registerInitializer(
    'sqljs',
    new SqljsInitializer(path.join(__dirname, '__data__'))
  );
  // Use live config as base, but override plugins for testing
  const liveConfig = require('../src/vendure-config').config;
  const config = mergeConfig(liveConfig, {
    logger: new DefaultLogger({ level: LogLevel.Debug }),
    orderOptions: {
      orderPlacedStrategy: new PlaceOrderOnSettlementStrategy(),
    },
    apiOptions: {
      port: 3000,
    },
    authOptions: testConfig.authOptions,
    dbConnectionOptions: {
      ...testConfig.dbConnectionOptions,
      synchronize: true,
    },
    paymentOptions: {
      paymentMethodHandlers: [testPaymentMethod],
    },
    shippingOptions: {
      ...liveConfig.shippingOptions,
      shippingCalculators: [
        ...liveConfig.shippingOptions.shippingCalculators,
        defaultShippingCalculator,
      ],
    },
    plugins: [
      LimitVariantPerOrderPlugin,
      MetricsPlugin,
      EBoekhoudenPlugin,
      EBookPlugin.init(process.env.VENDURE_HOST!),
      InvoicePlugin.init({
        vendureHost: 'localhost:3000',
        storageStrategy: new LocalFileStrategy(),
        dataStrategy: new TaxInvoiceStrategy(),
      }),
      GoedgepicktPlugin.init({
        vendureHost: 'localhost:3000',
        endpointSecret: 'secret',
        setWebhook: false,
      }),
      OrderExportPlugin.init({
        exportStrategies: [
          new TaxExportStrategy(),
          new ProductsSoldExportStrategy(),
        ],
      }),
      GoogleStoragePlugin,
      DefaultSearchPlugin,
      EmailPlugin.init({
        devMode: true,
        route: 'mailbox',
        handlers: [orderConfirmationHandler],
        templatePath: path.join(__dirname, '../static/email/templates'),
        outputPath: path.join(__dirname, 'test-emails'),
        globalTemplateVars: {
          fromAddress: 'martijn@pinelab.studio',
        },
      }),
      AdminUiPlugin.init({
        route: 'admin',
        port: 3002,
        adminUiConfig: {
          brand: 'Pinelab shops',
          hideVendureBranding: false,
          hideVersion: false,
        },
        app: {
          path: path.join(__dirname, '../src/__admin-ui/dist'),
        },
      }),
    ],
  });
  const { server, adminClient, shopClient } = createTestEnvironment(config);
  await server.init({
    initialData,
    productsCsvPath: path.join(__dirname, './products.csv'),
  });
  await adminClient.asSuperAdmin();
  const channelService = server.app.get(ChannelService);
  const shippingMethodService = server.app.get(ShippingMethodService);
  const defaultChannel = await channelService.getDefaultChannel();
  const ctx = new RequestContext({
    isAuthorized: true,
    authorizedAsOwnerOnly: false,
    channel: defaultChannel,
    apiType: 'admin',
  });
  await channelService.update(ctx, {
    id: defaultChannel.id,
    token: 'default-channel',
    pricesIncludeTax: true,
    currencyCode: CurrencyCode.EUR,
  });
  await shippingMethodService.update(ctx, {
    id: 1,
    checker: { code: 'eligible-without-address', arguments: [] },
    calculator: {
      code: 'tax-based-calculator',
      arguments: [{ name: 'rate', value: '500' }],
    },
    translations: [],
  });
  await shippingMethodService.update(ctx, {
    id: 2,
    checker: {
      code: 'eligible-by-zone',
      arguments: [{ name: 'zones', value: '["NL"]' }],
    },
    calculator: {
      code: 'tax-based-calculator',
      arguments: [{ name: 'rate', value: '600' }],
    },
    translations: [],
  });
  return { adminClient, shopClient, server };
}
