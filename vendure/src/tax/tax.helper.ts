import { Order } from '@vendure/core';
import { recalculateTaxFromTotalIncVAT } from '@pinelab/vendure-plugin-e-boekhouden';

/**
 * Tax summary for one or multiple orders
 */
export interface TaxSummary {
  taxTotal: TaxTotal;
  totalVAT: number;
  totalExVAT: number;
  totalIncVAT: number;
}

export interface TaxTotal {
  [key: number]: number;
}

export class TaxHelper {
  /**
   * Get taxSummary per order
   */
  static getTaxSummary(order: Order): TaxSummary {
    const taxTotal: TaxTotal = {};
    order.taxSummary.forEach((summary) => {
      const existingAmount = taxTotal[summary.taxRate] || 0;
      taxTotal[summary.taxRate] = existingAmount + summary.taxTotal;
    });
    return {
      taxTotal,
      totalIncVAT: order.totalWithTax,
      totalExVAT: order.total,
      totalVAT: order.totalWithTax - order.total,
    };
  }

  /**
   * TaxSumamry based on EBoekhouden tax recalculations
   * See https://github.com/Pinelab-studio/pinelab-vendure-plugins/pull/40 for more information
   */
  static getEBoekhoudenTaxSummary(order: Order): TaxSummary {
    const taxTotal: TaxTotal = {};
    let totalVAT = 0; // the total tax of all taxrates
    order.taxSummary.forEach((summary) => {
      const newSummary = recalculateTaxFromTotalIncVAT(summary);
      const existingAmount = taxTotal[summary.taxRate] || 0;
      totalVAT += newSummary.totalTax;
      taxTotal[summary.taxRate] = existingAmount + newSummary.totalTax;
    });

    return {
      taxTotal,
      totalIncVAT: order.totalWithTax, // Total stays the same
      totalExVAT: order.totalWithTax - totalVAT,
      totalVAT,
    };
  }
}
