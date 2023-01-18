import {
  DefaultOrderCodeStrategy,
  OrderCodeStrategy,
  RequestContext,
} from '@vendure/core';

/**
 * Generate numeric order codes for these channels
 */
const numericCodeChannels = ['wkw-default', 'demo'];

/**
 * Generates id's like 6149-2990-78 for hardcoded channels,
 * for others it uses the default ordercode
 */
export class ChannelSpecificOrderCodeStrategy
  extends DefaultOrderCodeStrategy
  implements OrderCodeStrategy
{
  generate(ctx: RequestContext): string {
    if (numericCodeChannels.includes(ctx.channel.token)) {
      return String(Date.now())
        .slice(1, 11)
        .match(/.{1,4}/g)!
        .join('-');
    }
    return super.generate(ctx);
  }
}
