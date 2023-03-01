import { ExportInput, ExportStrategy } from 'vendure-plugin-order-export';
import path from 'path';
import os from 'os';
import { Logger, Order, ProductVariant, RequestContext } from '@vendure/core';
import { createObjectCsvWriter } from 'csv-writer';
import { TaxHelper } from '../tax/tax.helper';
import { promises as fs } from 'fs';
import { OrderExportHelper } from './order-export-helper';

const loggerCtx = 'TaxExportStrategy';

export interface OrderRow {
  code: string;
  date: string;
  orderTotal: string;
  orderTotalWithTax: string;

  [key: string]: string;
}

export class ProductsSoldExportStrategy implements ExportStrategy {
  readonly name = 'products-sold';
  readonly contentType = 'text/csv';
  readonly fileExtension = 'csv';

  async createExportFile({
    ctx,
    startDate,
    endDate,
    orderService,
  }: ExportInput): Promise<string> {
    Logger.info(`Exporting orders from ${startDate} to ${endDate}`, loggerCtx);
    const orderExporter = new OrderExportHelper(orderService, loggerCtx);
    const orders = await orderExporter.getPlacedOrders(
      ctx,
      startDate,
      endDate,
      ['lines', 'lines.productVariant']
    );
    const soldProducts: Record<string, number> = {};
    orders.forEach((order) => {
      order.lines.forEach((line) => {
        const productName = this.getName(ctx, line.productVariant);
        let quantity = soldProducts[productName] || 0;
        quantity += line.quantity;
        soldProducts[productName] = quantity;
      });
    });
    // Record to array and sort
    const rows: { product: string; quantity: number }[] = Object.entries(
      soldProducts
    )
      .map(([product, quantity]) => ({ product, quantity }))
      .sort((a, b) => b.quantity - a.quantity);
    // Write to file
    const fileName = `${new Date().getTime()}-${startDate.getTime()}-${endDate.getTime()}.${
      this.fileExtension
    }`;
    const exportFile = path.join(os.tmpdir(), fileName);
    const csvWriter = createObjectCsvWriter({
      path: exportFile,
      header: [
        {
          id: 'product',
          title: 'Product',
        },
        {
          id: 'quantity',
          title: 'Quantity',
        },
      ],
    });

    await csvWriter.writeRecords(rows);
    return exportFile;
  }

  getName(ctx: RequestContext, variant: ProductVariant) {
    return (
      variant.translations.find((t) => t.languageCode === ctx.languageCode)
        ?.name ||
      variant.translations[0]?.name ||
      variant.sku
    );
  }
}
