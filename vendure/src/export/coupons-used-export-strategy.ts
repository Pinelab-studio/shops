import { ExportInput, ExportStrategy } from 'vendure-plugin-order-export';
import path from 'path';
import os from 'os';
import { Logger, ProductVariant, RequestContext } from '@vendure/core';
import { createObjectCsvWriter } from 'csv-writer';
import { OrderExportHelper } from './order-export-helper';

const loggerCtx = 'CouponsUsedExportStrategy';

export class CouponsUsedExportStrategy implements ExportStrategy {
  readonly name = 'coupons-used';
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
      []
    );
    const couponsUsed: Record<string, number> = {};
    orders.forEach((order) => {
      order.couponCodes.forEach((coupon) => {
        let quantity = couponsUsed[coupon] || 0;
        quantity += 1;
        couponsUsed[coupon] = quantity;
      });
    });
    // Record to array and sort
    const rows: { couponCode: string; quantity: number }[] = Object.entries(
      couponsUsed
    )
      .map(([couponCode, quantity]) => ({ couponCode, quantity }))
      .sort((a, b) => b.quantity - a.quantity);
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
          id: 'couponCode',
          title: 'Coupon code',
        },
        {
          id: 'quantity',
          title: 'Aantal keer gebruikt',
        },
      ],
    });

    await csvWriter.writeRecords(rows);
    return exportFile;
  }
}
