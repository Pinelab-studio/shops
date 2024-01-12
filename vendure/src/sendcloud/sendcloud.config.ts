import {
  Injector,
  Order,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';
import { isProd, runningLocal } from '../vendure-config';
import {
  getCouponCodes,
  ParcelInputItem,
  SendcloudPluginOptions,
} from '@pinelab/vendure-plugin-sendcloud';

export const sendcloudConfig: SendcloudPluginOptions = {
  disabled: isProd && !runningLocal, // Only enable for prod
  weightFn: (line) => {
    console.log(JSON.stringify(line.productVariant));
    const weight =
      (line.productVariant.product?.customFields as any)?.weight ??
      (line.productVariant.customFields as any)?.weight;
    return weight ? weight / 1000 : 0.001;
  },
  hsCodeFn: (line) =>
    (line.productVariant.product?.customFields as any)?.hsCode,
  originCountryFn: (line) => 'NL',
  additionalParcelItemsFn: async (ctx, injector, order) => {
    const additionalInputs: ParcelInputItem[] = [];
    // Add nr of orders from customer
    const nrOfOrders = await getNrOfOrders(ctx, injector, order);
    nrOfOrders.sku = 'Points';
    additionalInputs.push(nrOfOrders);
    // Add couponcodes
    const couponCodes = getCouponCodes(order);
    if (couponCodes) {
      additionalInputs.push(couponCodes);
    }
    // Add customer note
    if ((order.customFields as any).customerNote) {
      additionalInputs.push({
        description: (order.customFields as any).customerNote,
        quantity: 1,
        weight: '0.001',
        sku: 'Customer note',
        value: '0',
      });
    }
    return additionalInputs;
  },
};

/**
 * Get nr of orders including Shipped and PaymentSettled
 */
export async function getNrOfOrders(
  ctx: RequestContext,
  injector: Injector,
  order: Order
): Promise<ParcelInputItem> {
  let nrOfOrders = 0;
  if (order.customer?.id) {
    const orders = await injector
      .get(TransactionalConnection)
      .getRepository(ctx, Order)
      .find({
        where: [
          {
            customer: { id: order.customer.id },
            state: 'Delivered',
          },
          {
            customer: { id: order.customer.id },
            state: 'PaymentSettled',
          },
          {
            customer: { id: order.customer.id },
            state: 'Shipped',
          },
        ],
      });
    nrOfOrders = orders.length;
  }
  return {
    description: String(nrOfOrders),
    quantity: 1,
    weight: '0.001',
    sku: `Nr of orders`,
    value: '0',
  };
}
