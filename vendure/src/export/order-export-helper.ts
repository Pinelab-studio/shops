import {
  Logger,
  Order,
  OrderService,
  RelationPaths,
  RequestContext,
} from '@vendure/core';

export class OrderExportHelper {
  constructor(private orderService: OrderService, private loggerCtx: string) {}

  async getPlacedOrders(
    ctx: RequestContext,
    startDate: Date,
    endDate: Date,
    relations: RelationPaths<Order>
  ): Promise<Order[]> {
    const orders: Order[] = [];
    let hasMoreOrders = true;
    let skip = 0;
    while (hasMoreOrders) {
      const orderList = await this.orderService.findAll(
        ctx,
        {
          filter: {
            orderPlacedAt: {
              between: {
                start: startDate,
                end: endDate,
              },
            },
          },
          skip,
        },
        relations
      );
      Logger.info(
        `Fetched orders ${skip} - ${orderList.items.length}`,
        this.loggerCtx
      );
      orders.push(...orderList.items);
      skip += orderList.items.length;
      hasMoreOrders = orderList.totalItems > skip;
    }
    return orders;
  }
}
