import {
  ExportInput,
  ExportStrategy,
} from '@pinelab/vendure-plugin-order-export';
import path from 'path';
import os from 'os';
import { Logger, Order } from '@vendure/core';
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

export class TaxExportStrategy implements ExportStrategy {
  readonly name = 'btw-export';
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
      ['lines', 'shippingLines']
    );
    const uniqueTaxRates = new Set<string>();
    const totalTaxOfAllOrders: Record<string, number> = {};
    // Loop all orders
    const rows: OrderRow[] = await Promise.all(
      orders.map(async (order) => {
        const { taxTotal } = TaxHelper.getTaxSummary(order);
        Object.keys(taxTotal).forEach((taxRate) => uniqueTaxRates.add(taxRate));
        const formattedTaxTotal: any = {};
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
        // Loop all tax rates
        await Promise.all(
          Object.entries(taxTotal).map(async ([taxRate, value]) => {
            const keyName = `${countryCode?.toUpperCase()} ${taxRate}`;
            formattedTaxTotal[taxRate] = this.formatCurrency(value);
            // Check if "NL 9%" exists and set or update
            const existingTotal = totalTaxOfAllOrders[keyName] || 0;
            totalTaxOfAllOrders[keyName] = existingTotal + value;
          })
        );
        return {
          code: order.code,
          date: order.orderPlacedAt?.toLocaleDateString('nl-NL') || '',
          country: countryCode,
          orderTotal: this.formatCurrency(order.total),
          orderTotalWithTax: this.formatCurrency(order.totalWithTax),
          ...formattedTaxTotal,
        };
      })
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
        { id: 'total', title: 'totalen' },
        { id: 'code', title: 'bestelling' },
        { id: 'country', title: 'Land' },
        { id: 'date', title: 'datum' },
        { id: 'orderTotal', title: 'totaal excl. btw' },
        { id: 'orderTotalWithTax', title: 'totaal incl. btw' },
        // Taxrate headers, 9% 21% etc
        ...Array.from(uniqueTaxRates).map((rate) => ({
          id: rate,
          title: `${rate}%`,
        })),
      ],
    });
    const totalOfOrdersRecords = Object.entries(totalTaxOfAllOrders).map(
      ([key, value]) => ({
        total: `Totaal ${key}% BTW: ${this.formatCurrency(value)}`,
      })
    );
    await csvWriter.writeRecords(totalOfOrdersRecords);
    await csvWriter.writeRecords(rows);
    return exportFile;
  }

  private formatCurrency(value: number): string {
    return (value / 100).toFixed(2);
  }
}
