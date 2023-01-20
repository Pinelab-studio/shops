import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { WebhookPlugin } from 'vendure-plugin-webhook';
import { MyparcelPlugin } from 'vendure-plugin-myparcel/dist/myparcel.plugin';
import { GoedgepicktPlugin } from 'vendure-plugin-goedgepickt';
import { InvoicePlugin } from 'vendure-plugin-invoices';
import { EBoekhoudenPlugin } from 'vendure-plugin-e-boekhouden';
import {
  cancelOrderButton,
  completeOrderButton,
} from 'vendure-plugin-admin-ui-helpers';
import { OrderExportPlugin } from 'vendure-plugin-order-export';
import { StockMonitoringPlugin } from 'vendure-plugin-stock-monitoring';
import { SendcloudPlugin } from 'vendure-plugin-sendcloud';
import { MetricsPlugin } from 'vendure-plugin-metrics';

compileUiExtensions({
  outputPath: path.join(__dirname, '__admin-ui'),
  extensions: [
    MetricsPlugin.ui,
    InvoicePlugin.ui,
    WebhookPlugin.ui,
    MyparcelPlugin.ui,
    GoedgepicktPlugin.ui,
    EBoekhoudenPlugin.ui,
    OrderExportPlugin.ui,
    cancelOrderButton,
    completeOrderButton,
    StockMonitoringPlugin.ui,
    SendcloudPlugin.ui,
    setBranding({
      // The small logo appears in the top left of the screen
      smallLogoPath: path.join(__dirname, 'admin-branding/favicon.png'),
      // The large logo is used on the login page
      largeLogoPath: path.join(__dirname, 'admin-branding/logo.png'),
      faviconPath: path.join(__dirname, 'admin-branding/favicon.png'),
    }),
  ],
})
  .compile?.()
  .then(() => {
    process.exit(0);
  });
