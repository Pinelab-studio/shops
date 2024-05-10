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
