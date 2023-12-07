import {
  ExportInput,
  ExportStrategy,
} from '@pinelab/vendure-plugin-order-export';
import path from 'path';
import os from 'os';
import {
  Collection,
  Logger,
  ProductVariant,
  RequestContext,
} from '@vendure/core';
import { createObjectCsvWriter } from 'csv-writer';
import { OrderExportHelper } from './order-export-helper';

const loggerCtx = 'ProductsSoldExportStrategy';

interface SoldProductRow {
  product: string;
  sku: string;
  quantity: number;
  collections: string;
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
      [
        'lines',
        'lines.productVariant',
        'lines.productVariant.collections',
        'lines.productVariant.collections.translations',
      ]
    );
    const soldProducts: Record<string, SoldProductRow> = {};
    orders.forEach((order) => {
      order.lines.forEach((line) => {
        const productName = this.getName(ctx, line.productVariant);
        let existingRow: SoldProductRow = soldProducts[productName] || {
          product: productName,
          sku: line.productVariant.sku,
          quantity: 0,
          collections: line.productVariant.collections
            .map((c) => this.getName(ctx, c))
            .join(', '),
        };
        existingRow.quantity += line.quantity;
        soldProducts[productName] = existingRow;
      });
    });
    // Record to array and sort
    const rows: SoldProductRow[] = Object.values(soldProducts).sort(
      (a, b) => b.quantity - a.quantity
    );
    // Write to file
    const fileName = `${new Date().getTime()}-${startDate.getTime()}-${endDate.getTime()}.${
      this.fileExtension
    }`;
    const exportFile = path.join(os.tmpdir(), fileName);
    const csvWriter = createObjectCsvWriter({
      path: exportFile,
      fieldDelimiter: ';',
      alwaysQuote: true,
      header: [
        {
          id: 'product',
          title: 'Product variant',
        },
        {
          id: 'sku',
          title: 'SKU',
        },
        {
          id: 'quantity',
          title: 'Quantity',
        },
        {
          id: 'collections',
          title: 'Collections',
        },
      ],
    });

    await csvWriter.writeRecords(rows);
    return exportFile;
  }

  getName(ctx: RequestContext, item: ProductVariant | Collection): string {
    return (
      (item.translations as any).find(
        (t: any) => t.languageCode === ctx.languageCode
      )?.name ||
      item.translations[0]?.name ||
      ''
    );
  }
}
