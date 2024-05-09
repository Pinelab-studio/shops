import {
  Channel,
  Logger,
  Order,
  RequestContext,
  RequestContextCacheService,
  Zone,
} from '@vendure/core';
import { TaxZoneStrategy } from '@vendure/core/dist/config/tax/tax-zone-strategy';
import { app } from '../';

const loggerCtx = 'TaxZoneStrategy';

export class ShippingBasedTaxZoneStrategy implements TaxZoneStrategy {
  determineTaxZone(
    ctx: RequestContext,
    zones: Zone[],
    channel: Channel,
    order?: Order
  ): Zone {
    // FIXME: Dirty hack to avoid caching of wrong 'activeTaxZone'. This patch makes sure get() never returns anything for activeTaxZone
    // This is due to a wrong cache setting in Vendure core. The commit below (v2.2.0) should fix this issue:
    // https://github.com/vendure-ecommerce/vendure/commit/e543e5e7006140518be311bc7e60687bd9b40778
    // Next block should be removed when upgraded to v2.2.0
    const requestContextCache = app.get(RequestContextCacheService);
    const originalGet = requestContextCache.get;
    requestContextCache.get = function (ctx, key, getDefault?: any) {
      if (key === 'activeTaxZone') {
        return getDefault?.();
      } else {
        return originalGet.call(requestContextCache, ctx, key, getDefault);
      }
    }; // End of ugly patch block

    const countryCode = order?.shippingAddress?.countryCode;
    if (order && countryCode) {
      const zone = zones.find((zone) =>
        zone.members?.find((member) => member.code === countryCode)
      );
      if (zone) {
        return zone;
      }
      Logger.warn(
        `No tax zone found for country ${countryCode}. Setting default ${channel.defaultTaxZone.name} for order ${order.code}`,
        loggerCtx
      );
    }
    return channel.defaultTaxZone;
  }
}
