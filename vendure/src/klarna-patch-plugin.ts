import { ModuleRef } from '@nestjs/core';
import {
  EntityHydrator,
  EventBus,
  Injector,
  Logger,
  Order,
  OrderStateTransitionEvent,
  PluginCommonModule,
  RequestContext,
  VendurePlugin,
} from '@vendure/core';
import { MollieService } from '@vendure/payments-plugin/package/mollie/mollie.service';

const loggerCtx = 'KlarnaPatchPlugin';

/**
 * This plugin patches the issue where payments are not auto captured when using Klarna.
 * Should be removed when XXX gets merged. TODO: Add link to PR
 *
 * AutoCapture needs to be disabled in the Mollie Payment method in the Admin UI for this plugin
 *
 * FIXME: this can be removed after upgrading to Vendure 2.1.1
 */
@VendurePlugin({
  imports: [PluginCommonModule],
})
export class KlarnaPatchPlugin {
  constructor(
    private readonly eventBus: EventBus,
    private readonly moduleRef: ModuleRef
  ) {
    Logger.info(
      `Listening for orders that transition to PaymentAuthorized...`,
      loggerCtx
    );
    this.eventBus.ofType(OrderStateTransitionEvent).subscribe((event) => {
      if (event.toState !== 'PaymentAuthorized') {
        // Only handle PaymentAuthorized
        return;
      }
      this.captureKlarnaPayment(event.ctx, event.order).catch((error) => {
        Logger.error(
          `Failed to capture Klarna payment for order ${event.order.code}: ${error}`,
          loggerCtx
        );
      });
    });
  }

  /**
   * Check if the payment method is Klarna, and if a Mollie orderId is present.
   * If so, capture the Mollie payment and settle the Vendure payment
   */
  async captureKlarnaPayment(ctx: RequestContext, order: Order): Promise<void> {
    Logger.info(`Trying to capture payment for ${order.code}`, loggerCtx);
    const injector = new Injector(this.moduleRef);
    const entityHydrator = injector.get(EntityHydrator);
    order = await entityHydrator.hydrate(ctx, order, {
      relations: ['payments'],
    });
    // Get latest payment based on createdAt
    const payment = order.payments.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })[0];
    if (payment.metadata.method !== 'klarnapaylater') {
      // Only handle Klarna payments
      Logger.info(
        `Latest payment of order ${order.code} is not Klarna, so not capturing payments for this order.`,
        loggerCtx
      );
      return;
    }
    const mollieOrderId = payment.metadata.orderId;
    if (!mollieOrderId) {
      Logger.error(
        `No Mollie orderId found in payment.metadata.orderId for Klarna payment of order ${order.code}. Can not capture payment! This requires manual action!`,
        loggerCtx
      );
    }
    const mollieService = injector.get(MollieService);
    await mollieService.settleExistingPayment(
      ctx,
      order,
      payment.metadata.orderId
    );
    Logger.info(
      `Captured Klarna payment for order ${order.code} (Mollie orderId ${mollieOrderId})`,
      loggerCtx
    );
  }
}
