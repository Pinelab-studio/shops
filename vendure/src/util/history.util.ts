import { HistoryService, ID, Injector, RequestContext } from '@vendure/core';
import { HistoryEntryType } from '@vendure/common/lib/generated-shop-types';

export async function logOrderHistory(
  ctx: RequestContext,
  injector: Injector,
  orderId: ID,
  message: string
): Promise<void> {
  await injector.get(HistoryService).createHistoryEntryForOrder(
    {
      ctx,
      orderId,
      type: HistoryEntryType.ORDER_NOTE,
      data: {
        note: message,
      },
    },
    false
  );
}
