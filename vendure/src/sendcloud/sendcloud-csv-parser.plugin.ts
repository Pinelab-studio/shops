import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('sendcloud-csv-parser')
export class SendcloudCsvParserController {
  constructor() {}

  @Get('/')
  async download(@Query('csv') csvUrl: string) {
    console.log('INCOMING', csvUrl);
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
