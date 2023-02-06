/**
 * Keeps polling for 10 seconds untill order is settled
 */
import { VendureClient } from '../vendure/vendure.client';
import { OrderFieldsFragment } from '../generated/graphql';

export async function getOrderByCode(vendure: VendureClient, code: string) {
  let order: OrderFieldsFragment | undefined | void;
  let pollingCount = 0;
  while (
    order?.state !== 'PaymentSettled' &&
    order?.state !== 'PaymentAuthorized'
  ) {
    if (pollingCount > 10) {
      throw Error(`Order not settled after polling 10 times`);
    }
    order = await vendure
      .getOrderByCode(code)
      .catch((e) => console.error(`Unable to get order by code: ${e}`));
    console.log(order?.state);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    pollingCount++;
    console.log(`Polling for payment status ${pollingCount}`);
  }
  return order;
}
