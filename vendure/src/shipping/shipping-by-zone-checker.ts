import {
  ChannelService,
  LanguageCode,
  Logger,
  RequestContext,
  ShippingEligibilityChecker,
  Zone,
  ZoneService,
} from '@vendure/core';
import { getZonesForCountryCode } from '../util/zone.util';

let allZones: Zone[] = [];
const loggerCtx = 'ShippingByZoneChecker';
export const eligibleByZoneChecker = new ShippingEligibilityChecker({
  code: 'eligible-by-zone',
  description: [{ languageCode: LanguageCode.en, value: 'Shipping by zone' }],
  args: {
    zones: {
      type: 'string',
      list: true,
      ui: {
        component: 'select-form-input',
        options: [
          { value: 'NL' },
          { value: 'BE' },
          { value: 'EU' },
          { value: 'Asia' },
          { value: 'Europe' },
          { value: 'Africa' },
          { value: 'Oceania' },
          { value: 'Americas' },
        ],
      },
    },
  },
  init: async (injector) => {
    const channel = await injector.get(ChannelService).getDefaultChannel();
    const ctx = new RequestContext({
      apiType: 'admin',
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
    });
    const zonesList = await injector.get(ZoneService).findAll(ctx);
    allZones = zonesList.items;
  },
  check: (ctx, order, args) => {
    if (allZones.length === 0) {
      Logger.error(
        'No zones initialized, unable to check shipping eligibility',
        loggerCtx
      );
      return false;
    }
    const orderCountryCode = order.shippingAddress?.countryCode;
    if (!orderCountryCode) {
      return false;
    }
    const orderZones = getZonesForCountryCode(orderCountryCode, allZones);
    if (orderZones.length === 0) {
      Logger.error(
        `No zone found for order ${order.code} with country ${orderCountryCode}`,
        loggerCtx
      );
      return false;
    }
    const zoneNames = orderZones.map((zone) => zone.name.toLowerCase());
    const eligible = args.zones?.find((configuredZone) =>
      zoneNames.includes(configuredZone.toLowerCase())
    );
    return !!eligible;
  },
});
