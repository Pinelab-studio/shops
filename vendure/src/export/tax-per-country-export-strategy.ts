import { Logger } from '@vendure/core';
import { createObjectCsvWriter } from 'csv-writer';
import os from 'os';
import path from 'path';
import { ExportInput, ExportStrategy } from 'vendure-plugin-order-export';
import { OrderExportHelper } from './order-export-helper';

const loggerCtx = 'TaxExportStrategy';

export interface TaxRow {
  countryRate: string;
  exTax: number;
  incTax: number;
  tax: number;
}

export class TaxPerCountryExportStrategy implements ExportStrategy {
  readonly name = 'btw-per-land-export';
  readonly contentType = 'text/csv';
  readonly fileExtension = 'csv';

  async createExportFile({
    ctx,
    startDate,
    endDate,
    orderService,
  }: ExportInput): Promise<string> {
    Logger.info(
      `Exporting tax per country from ${startDate} to ${endDate}`,
      loggerCtx
    );
    const orderExporter = new OrderExportHelper(orderService, loggerCtx);
    const orders = await orderExporter.getPlacedOrders(
      ctx,
      startDate,
      endDate,
      ['lines', 'shippingLines']
    );
    const taxRows: Record<string, TaxRow> = {};
    // Loop all orders
    for (const order of orders) {
      let countryCode = order.shippingAddress?.countryCode;
      if (!order.shippingAddress.countryCode) {
        // Try to resolve country by customers address
        const updatedOrder = await orderService.findOne(ctx, order.id, [
          'customer',
          'customer.addresses',
          'customer.addresses.country',
        ]);
        countryCode =
          updatedOrder?.customer?.addresses?.[0]?.country.code ||
          `onbekend (${order.code})`;
      }
      countryCode = countryCode?.toUpperCase();
      // Sum of all taxes per country and tax rate
      order.taxSummary.forEach((tax) => {
        const countryRate = `${countryCode} ${tax.taxRate}`;
        const incTax = tax.taxTotal + tax.taxBase; // Ex btw + btw
        const existingRow = taxRows[countryRate];
        const totals: TaxRow = {
          countryRate,
          exTax: (existingRow?.exTax || 0) + tax.taxBase,
          incTax: (existingRow?.incTax || 0) + incTax,
          tax: (existingRow?.tax || 0) + tax.taxTotal,
        };
        taxRows[countryRate] = totals;
      });
    }
    // Format currency and transform to array
    const taxRowsArray = Object.values(taxRows).map((value) => ({
      countryRate: value.countryRate,
      exTax: this.formatCurrency(value.exTax),
      incTax: this.formatCurrency(value.incTax),
      tax: this.formatCurrency(value.tax),
    }));
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
        { id: 'countryRate', title: 'landTarief' },
        { id: 'incTax', title: 'incBTW' },
        { id: 'exTax', title: 'exBTW' },
        { id: 'tax', title: 'BTW' },
      ],
    });
    await csvWriter.writeRecords(taxRowsArray);
    return exportFile;
  }

  private formatCurrency(value: number): string {
    return (value / 100).toFixed(2);
  }
}
