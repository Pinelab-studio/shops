import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import * as path from 'path';
import { WebhookPlugin } from '@pinelab/vendure-plugin-webhook';
import { MyparcelPlugin } from '@pinelab/vendure-plugin-myparcel/dist/myparcel.plugin';
import { GoedgepicktPlugin } from '@pinelab/vendure-plugin-goedgepickt';
import { InvoicePlugin } from '@pinelab/vendure-plugin-invoices';
import { EBoekhoudenPlugin } from '@pinelab/vendure-plugin-e-boekhouden';
import {
  cancelOrderButton,
  completeOrderButton,
} from '@pinelab/vendure-plugin-admin-ui-helpers';
import { OrderExportPlugin } from '@pinelab/vendure-plugin-order-export';
import { StockMonitoringPlugin } from '@pinelab/vendure-plugin-stock-monitoring';
import { SendcloudPlugin } from '@pinelab/vendure-plugin-sendcloud';
import { MetricsPlugin } from '@pinelab/vendure-plugin-metrics';

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
