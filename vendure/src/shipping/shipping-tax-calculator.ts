import { LanguageCode, ShippingCalculator } from '@vendure/core';

/**
 * Use max tax used in orderItems as tax for shipping.
 */
export const cartTaxShippingCalculator = new ShippingCalculator({
  code: 'tax-based-calculator',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Tax based on items in cart. Rate is including tax.',
    },
  ],
  args: {
    rate: {
      type: 'int',
      ui: { component: 'currency-form-input' },
    },
  },
  calculate: (ctx, order, args) => {
    let maxTax;
    if (order.lines?.length > 0) {
      maxTax = Math.max(...(order.lines.map((line) => line.taxRate) || 0));
    } else {
      maxTax = order.taxSummary?.[0]?.taxRate || 0;
    }
    return {
      price: args.rate,
      taxRate: maxTax,
      priceIncludesTax: true,
    };
  },
});
