import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import fetch from 'node-fetch';
import { Response } from 'express';
import * as Papa from 'papaparse';

/**
 * 1. Copy link from SendCloud email
 * 2. Go to https://www.urlencoder.org/ and encode the url
 * 3. In your browser, type `http://localhost:3000/sendcloud-csv-parser?csv=<encoded url>`
 */
@Controller('sendcloud-csv-parser')
export class SendcloudCsvParserController {
  constructor() {}

  @Get('/')
  async download(@Query('csv') csvUrl: string, @Res() res: Response) {
    const csvRes = await fetch(csvUrl);
    if (!csvRes.ok) {
      return res.status(csvRes.status).send(await csvRes.text());
    }
    const csvString = await csvRes.text();
    const csvData = await this.parse(csvString);
    const totalItems = new Map<string, number>();
    // Loop all rows of the CSV
    for (const row of csvData) {
      const itemString = row['parcel items' as any];
      if (!itemString) {
        continue;
      }
      const items = JSON.parse(itemString);
      // Loop each over parcel_item
      items.forEach((item: any) => {
        let amount = totalItems.get(item.description) || 0;
        amount += item.quantity;
        totalItems.set(item.description, amount);
      });
    }
    let responseCsvString = '';
    totalItems.forEach((amount, description) => {
      responseCsvString += `"${description}": ${amount}<br>`;
    });
    return res.send(responseCsvString);
  }

  parse(csvString: string): Promise<any[]> {
    return new Promise((resolve) => {
      Papa.parse(csvString, {
        header: true,
        complete: function (results) {
          resolve(results.data);
        },
      });
    });
  }
}

/**
 * This plugin takes the URL of a CSV export from Sendcloud,
 * and parses all items from the CSV, calculates the sum of its quantities and returns a new CSV
 * ( It actually does nothing with Vendure... )
 * @example
 * http://localhost:3000/sendcloud-csv-parser?csv=https://s3-eu-central-1.amazonaws.com/somepublicurl
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [SendcloudCsvParserController],
})
export class SendcloudCsvParserPlugin {}
