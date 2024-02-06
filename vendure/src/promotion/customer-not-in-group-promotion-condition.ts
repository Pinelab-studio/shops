import { LanguageCode } from '@vendure/common/lib/generated-types';
import { ID } from '@vendure/common/lib/shared-types';
import {
  CustomerService,
  EventBus,
  PromotionCondition,
  TtlCache,
  CustomerGroupChangeEvent,
  idsAreEqual,
} from '@vendure/core';
import { Subscription } from 'rxjs';

let customerService: CustomerService;
let subscription: Subscription | undefined;

const fiveMinutes = 5 * 60 * 1000;
const cache = new TtlCache<ID, ID[]>({ ttl: fiveMinutes });

/**
 * This is based on the built-in `customer_group` condition, but it instead checks if a custom is NOT in the given group.
 * Based on this Vendure core condition: packages/core/src/config/promotion/conditions/customer-group-condition.ts
 */
export const customerNotInGroup = new PromotionCondition({
  code: 'customer_not_in_group',
  description: [
    {
      languageCode: LanguageCode.en,
      value: 'Customer is not a member of the specified group',
    },
  ],
  args: {
    customerGroupId: {
      type: 'ID',
      ui: { component: 'customer-group-form-input' },
      label: [{ languageCode: LanguageCode.en, value: 'Customer group' }],
    },
  },
  async init(injector) {
    customerService = injector.get(CustomerService);
    subscription = injector
      .get(EventBus)
      .ofType(CustomerGroupChangeEvent)
      .subscribe((event) => {
        // When a customer is added to or removed from a group, we need
        // to invalidate the cache for that customer id
        for (const customer of event.customers) {
          cache.delete(customer.id);
        }
      });
  },
  destroy() {
    subscription?.unsubscribe();
  },
  async check(ctx, order, args) {
    if (!order.customer) {
      return false;
    }
    const customerId = order.customer.id;
    let groupIds = cache.get(customerId);
    if (!groupIds) {
      const groups = await customerService.getCustomerGroups(ctx, customerId);
      groupIds = groups.map((g) => g.id);
      cache.set(customerId, groupIds);
    }
    return !groupIds.find((id) => idsAreEqual(id, args.customerGroupId));
  },
});
