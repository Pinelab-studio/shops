import {
  InvoiceData,
  LoadDataFn,
  defaultLoadDataFn,
} from '@pinelab/vendure-plugin-invoices';
import { TaxHelper } from '../tax/tax.helper';

/**
 * Show tax rounding equal to how eBoekhouden does it
 */
export const taxInvoiceDataFn: LoadDataFn = async (
  ctx,
  injector,
  order,
  mostRecentInvoiceNumber,
  shouldGenerateCreditInvoice
) => {
  const defaultData = await defaultLoadDataFn(
    ctx,
    injector,
    order,
    mostRecentInvoiceNumber,
    shouldGenerateCreditInvoice
  );
  const summary = TaxHelper.getTaxSummary(order);
  // eBoekhouden calculates priceExBTW back from priceIncBTW to prevent rounding errors
  const eboekhoudenSummary = TaxHelper.getEBoekhoudenTaxSummary(order);
  return {
    ...defaultData,
    summary,
    eboekhoudenSummary,
  };
};
