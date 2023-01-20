import { RequestContext } from '@vendure/core';
import {
  getMonthName,
  MetricCalculation,
  MetricInterval,
  MetricSummaryEntry,
  MetricData,
} from 'vendure-plugin-metrics';

export class RevenueMetric implements MetricCalculation {
  code = 'revenue';

  getTitle(ctx: RequestContext): string {
    return `Revenue (ex. tax) in ${ctx.channel.currencyCode}`;
  }

  calculateEntry(
    ctx: RequestContext,
    interval: MetricInterval,
    weekOrMonthNr: number,
    data: MetricData
  ): MetricSummaryEntry {
    const label =
      interval === MetricInterval.Monthly
        ? getMonthName(weekOrMonthNr)
        : `Week ${weekOrMonthNr}`;
    const totalRevenue = data.orders
      .map((order) => order.total)
      .reduce((acc, current) => acc + current, 0);
    return {
      label,
      value: totalRevenue / 100,
    };
  }
}
