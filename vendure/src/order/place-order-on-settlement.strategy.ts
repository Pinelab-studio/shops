import {
  Order,
  OrderPlacedStrategy,
  OrderState,
  RequestContext,
} from '@vendure/core';

/**
 * Define order as 'Placed' when transitioned to PaymentSettled from either ArrangingPayment or from PaymentAuthorized
 */
export class PlaceOrderOnSettlementStrategy implements OrderPlacedStrategy {
  shouldSetAsPlaced(
    ctx: RequestContext,
    fromState: OrderState,
    toState: OrderState,
    order: Order
  ): boolean {
    return (
      (fromState === 'ArrangingPayment' || fromState === 'Draft') &&
      (toState === 'PaymentSettled' || toState === 'PaymentAuthorized')
    );
  }
}
