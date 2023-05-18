import {
  CollectionEvent,
  CollectionModificationEvent,
  DefaultLogger,
  DefaultSearchPlugin,
  defaultShippingEligibilityChecker,
  LanguageCode,
  LogLevel,
  ProductEvent,
  ProductVariantChannelEvent,
  ProductVariantEvent,
  VendureConfig,
  VendureLogger,
} from '@vendure/core';
import { EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';
import {
  GoogleStoragePlugin,
  GoogleStorageStrategy,
} from 'vendure-plugin-google-storage-assets';
import { WebhookPlugin } from 'vendure-plugin-webhook';
import { DutchPostalCodePlugin } from 'vendure-plugin-dutch-postalcode';
import { CloudTasksPlugin } from 'vendure-plugin-google-cloud-tasks';
import { cloudLogger } from './logger';
import { MyparcelPlugin } from 'vendure-plugin-myparcel/dist/myparcel.plugin';
import { ShippingBasedTaxZoneStrategy } from './tax/shipping-based-tax-zone.strategy';
import { cartTaxShippingCalculator } from './shipping/shipping-tax-calculator';
import { eligibleByZoneChecker } from './shipping/shipping-by-zone-checker';
import { MolliePlugin } from '@vendure/payments-plugin/package/mollie';
import { PlaceOrderOnSettlementStrategy } from './order/place-order-on-settlement.strategy';
import { GoedgepicktPlugin } from 'vendure-plugin-goedgepickt';
import {
  GoogleStorageInvoiceStrategy,
  InvoicePlugin,
} from 'vendure-plugin-invoices';
import { TaxInvoiceStrategy } from './invoice/tax-invoice-strategy';
import { CoinbasePlugin } from 'vendure-plugin-coinbase';
import { EBoekhoudenPlugin } from 'vendure-plugin-e-boekhouden';
import { EBookPlugin } from './e-book/e-book.plugin';
import { eligibleWithoutAddressChecker } from './shipping/eligible-without-address-checker';
import { OrderExportPlugin } from 'vendure-plugin-order-export';
import { TaxExportStrategy } from './export/tax-export-strategy';
import { orderConfirmationHandler } from './email/order-confirmation.handlers';
import { json } from 'body-parser';
import { ShippingByWeightAndCountryPlugin } from 'vendure-plugin-shipping-by-weight-and-country';
import {
  createLowStockEmailHandler,
  StockMonitoringPlugin,
} from 'vendure-plugin-stock-monitoring';
import { SendcloudPlugin } from 'vendure-plugin-sendcloud';
import { sendcloudConfig } from './sendcloud/sendcloud.config';
import { ChannelSpecificOrderCodeStrategy } from './order/order-code-strategy';
import { LimitVariantPerOrderPlugin } from 'vendure-plugin-limit-product-per-order';
import { VariantBulkUpdatePlugin } from 'vendure-plugin-variant-bulk-update';
import { ProductsSoldExportStrategy } from './export/products-sold-export-strategy';
import { CouponsUsedExportStrategy } from './export/coupons-used-export-strategy';
import { MetricsPlugin } from 'vendure-plugin-metrics';

let logger: VendureLogger;
export let runningLocal = false;
export let isProd = false;
export let runningInWorker = false;
if (process.env.K_SERVICE) {
  // This means we are in CloudRun
  logger = cloudLogger;
  runningInWorker = process.env.K_SERVICE.indexOf('worker') > -1; // Name of worker is worker or worker-test
} else {
  logger = new DefaultLogger({ level: LogLevel.Debug });
  runningLocal = true;
}
if (process.env.SHOP_ENV === 'prod' || process.env.SHOP_ENV === 'wkw-prod') {
  isProd = true;
}

export const config: VendureConfig = {
  logger,
  orderOptions: {
    orderPlacedStrategy: new PlaceOrderOnSettlementStrategy(),
    orderCodeStrategy: new ChannelSpecificOrderCodeStrategy(),
  },
  apiOptions: {
    port: (process.env.PORT! as unknown as number) || 3000,
    adminApiPath: 'admin-api',
    adminApiPlayground: runningLocal ? {} : false,
    adminApiDebug: false, // turn this off for production
    shopApiPath: 'shop-api',
    shopApiPlayground: {}, // turn this off for production
    shopApiDebug: false, // turn this off for production
    shopListQueryLimit: 500,
    middleware: [
      {
        route: `/`,
        handler: json({ limit: '1mb' }),
      },
    ],
  },
  authOptions: {
    superadminCredentials: {
      identifier: 'admin',
      password: process.env.SUPERADMIN_PASS!,
    },
    tokenMethod: 'bearer',
  },
  assetOptions: {
    permittedFileTypes: ['image/*', 'video/*', 'audio/*', '.pdf', '.epub'],
    uploadMaxFileSize: 36700160,
  },
  dbConnectionOptions: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    // logging: 'all',
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    database: process.env.DATABASE_NAME!,
    migrations: [path.join(__dirname, '../migrations/*.ts')],
    socketPath: runningLocal
      ? undefined
      : `/cloudsql/${process.env.SOCKET_CONNECTION_NAME}`,
  },
  taxOptions: {
    taxZoneStrategy: new ShippingBasedTaxZoneStrategy(),
  },
  shippingOptions: {
    shippingCalculators: [cartTaxShippingCalculator],
    shippingEligibilityCheckers: [
      defaultShippingEligibilityChecker,
      eligibleByZoneChecker,
      eligibleWithoutAddressChecker,
    ],
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  customFields: {
    Order: [
      {
        name: 'customerNote',
        label: [{ value: 'Customer note', languageCode: LanguageCode.en }],
        ui: { component: 'textarea-form-input' },
        type: 'text',
      },
      {
        name: 'referralCode',
        label: [{ value: 'Referral code', languageCode: LanguageCode.en }],
        ui: { component: 'text-form-input' },
        type: 'text',
      },
      {
        name: 'vatId',
        public: true,
        nullable: true,
        label: [{ value: 'VAT identification', languageCode: LanguageCode.en }],
        ui: { component: 'text-form-input' },
        type: 'text',
      },
    ],
    Product: [
      {
        name: 'metaTitle',
        label: [{ value: 'Meta title', languageCode: LanguageCode.en }],
        type: 'localeString',
        ui: { component: 'text-form-input', tab: 'SEO' },
      },
      {
        name: 'metaDescription',
        label: [{ value: 'Meta description', languageCode: LanguageCode.en }],
        type: 'localeString',
        ui: { component: 'textarea-form-input', tab: 'SEO' },
        validate: (value: string) => {
          if (value?.length > 255) {
            return [
              {
                value: 'Meta description can be max 255 characters',
                languageCode: LanguageCode.en,
              },
            ];
          }
        },
      },
      {
        name: 'keywords',
        label: [{ value: 'Keywords', languageCode: LanguageCode.en }],
        description: [
          {
            languageCode: LanguageCode.en,
            value: 'Comma seperated list of keywords',
          },
        ],
        type: 'localeString',
        ui: { component: 'textarea-form-input', tab: 'Search' },
        validate: (value: string) => {
          if (value?.length > 255) {
            return [
              {
                value: 'Keywords can be max 255 characters',
                languageCode: LanguageCode.en,
              },
            ];
          }
        },
      },
      {
        name: 'hsCode',
        label: [{ value: 'HS code', languageCode: LanguageCode.en }],
        type: 'string',
        ui: { component: 'text-form-input', tab: 'Physical properties' },
      },
    ],
  },
  plugins: [
    VariantBulkUpdatePlugin,
    LimitVariantPerOrderPlugin,
    MetricsPlugin,
    EBoekhoudenPlugin,
    EBookPlugin.init(process.env.VENDURE_HOST!),
    InvoicePlugin.init({
      licenseKey: process.env.INVOICE_LICENSE,
      vendureHost: process.env.VENDURE_HOST!,
      storageStrategy: new GoogleStorageInvoiceStrategy({
        bucketName: 'pinelab-invoices',
        storageOptions: runningLocal ? { keyFilename: 'key.json' } : undefined,
      }),
      dataStrategy: new TaxInvoiceStrategy(),
    }),
    CloudTasksPlugin.init({
      taskHandlerHost: process.env.WORKER_HOST!,
      projectId: process.env.GOOGLE_PROJECT_ID!,
      location: 'europe-west1',
      authSecret: process.env.CLOUD_TASKS_SECRET!,
      queueSuffix: process.env.SHOP_ENV!,
    }),
    DutchPostalCodePlugin.init(process.env.POSTCODE_APIKEY!),
    WebhookPlugin.init({
      httpMethod: 'POST',
      delay: 3000,
      disabled: runningInWorker || runningLocal, // disable for 'worker' and locally
      events: [
        ProductEvent,
        ProductVariantChannelEvent,
        ProductVariantEvent,
        CollectionModificationEvent,
        CollectionEvent,
      ],
    }),
    MolliePlugin.init({ vendureHost: process.env.VENDURE_HOST! }),
    GoogleStoragePlugin,
    CoinbasePlugin,
    MyparcelPlugin.init({
      vendureHost: process.env.VENDURE_HOST!,
      syncWebhookOnStartup: isProd && !runningLocal, // Only sync for prod,
      getCustomsInformationFn: (orderLine) => {
        return {
          weightInGrams:
            (orderLine.productVariant.product.customFields as any).weight || 0,
          classification: (orderLine.productVariant.product.customFields as any)
            .hsCode,
          countryCodeOfOrigin: 'NL',
        };
      },
    }),
    GoedgepicktPlugin.init({
      vendureHost: process.env.VENDURE_HOST!,
      endpointSecret: process.env.WEBHOOK_TOKEN!,
      setWebhook: isProd && !runningLocal, // Only set webhook for prod
    }),
    OrderExportPlugin.init({
      exportStrategies: [
        new TaxExportStrategy(),
        new ProductsSoldExportStrategy(),
        new CouponsUsedExportStrategy(),
      ],
    }),
    ShippingByWeightAndCountryPlugin.init({
      customFieldsTab: 'Physical properties',
      weightUnit: 'grams',
    }),
    StockMonitoringPlugin.init({
      threshold: 5,
    }),
    SendcloudPlugin.init(sendcloudConfig),
    AssetServerPlugin.init({
      storageStrategyFactory: () =>
        new GoogleStorageStrategy({
          bucketName: process.env.BUCKET!,
          thumbnails: {
            height: 500,
            width: 500,
          },
        }),
      route: 'assets',
      assetUploadDir: '/tmp/vendure/assets',
    }),
    DefaultSearchPlugin,
    EmailPlugin.init({
      // Dev settings
      /*      devMode: true,
            route: 'mailbox',
            outputPath: path.join(__dirname, 'test-emails'),*/
      transport: {
        type: 'smtp',
        host: 'smtp.zeptomail.eu',
        port: 587,
        secure: false,
        logging: false,
        debug: true,
        auth: {
          user: 'emailapikey',
          pass: process.env.ZEPTOMAIL_KEY,
        },
      },
      handlers: [
        orderConfirmationHandler,
        createLowStockEmailHandler({
          threshold: 10,
          subject: 'Lage voorraad',
          emailRecipients: ['martijn@pinelab.studio'],
        }),
      ],
      templatePath: path.join(__dirname, '../static/email/templates'),
    }),
    // Production ready, precompiled admin UI
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      adminUiConfig: {
        brand: 'Pinelab shops',
        hideVendureBranding: false,
        hideVersion: false,
      },
      app: {
        path: path.join(__dirname, '__admin-ui/dist'),
      },
    }),
  ],
};

if (config.dbConnectionOptions.synchronize) {
  throw Error(
    "Don't ever synchronize the DB!!! Use 'yarn migration:generate:test' to migrate the database"
  );
}
