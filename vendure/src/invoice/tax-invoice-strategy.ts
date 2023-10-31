import { DataFnInput, InvoiceData } from '@pinelab/vendure-plugin-invoices';
import { TaxHelper } from '../tax/tax.helper';
import { DefaultDataStrategy } from '@pinelab/vendure-plugin-invoices';

export class TaxInvoiceStrategy extends DefaultDataStrategy {
  async getData(input: DataFnInput): Promise<InvoiceData> {
    const defaultData = await super.getData(input);
    const summary = TaxHelper.getTaxSummary(input.order);
    // eBoekhouden calculates priceExBTW back from priceIncBTW to prevent rounding errors
    const eboekhoudenSummary = TaxHelper.getEBoekhoudenTaxSummary(input.order);
    return {
      ...defaultData,
      summary,
      eboekhoudenSummary,
    };
  }
}
