import { Logger, OrderPlacedEvent, translateDeep } from '@vendure/core';
import { EmailEventHandler, EmailEventListener } from '@vendure/email-plugin';
import { mockOrderStateTransitionEvent } from '@vendure/email-plugin/lib/src/mock-events';
import { InvoiceService } from '@pinelab/vendure-plugin-invoices';
import { EBookController } from '../e-book/e-book.plugin';
import { TaxHelper } from '../tax/tax.helper';
import { logOrderHistory } from '../util/history.util';
import { EmailUtil } from './email.util';

const loggerCtx = 'OrderConfirmationHandler';

/**
 * Send email to customer AND administrators of channel
 */
export const orderConfirmationHandler: EmailEventHandler<any, any> =
  new EmailEventListener('order-confirmation')
    .on(OrderPlacedEvent)
    .loadData(async ({ event, injector }) => {
      const channel = event.ctx.channel;

      // Fix to translate productVariants to default language
      // Should be fixed in: https://github.com/vendure-ecommerce/vendure/issues/2124
      event.order.lines.forEach((line) => {
        line.productVariant = translateDeep(
          line.productVariant,
          channel.defaultLanguageCode
        );
      });
      // Set customized email subject
      let subject = `Bedankt voor je bestelling bij ${channel.code} met nr. ${event.order.code}`;
      if (channel.token === 'wkw-default') {
        subject = `Bedankt voor je bestelling bij de Wormenkwekerij met nr. ${event.order.code}`;
      } else if (channel.token === 'op') {
        subject = `Je e-boek Op! van Jet van Nieuwkerk`;
      }
      const [{ sender, additionalRecipients }, invoicesEnabled] =
        await Promise.all([
          EmailUtil.getAdminEmailAddressesForChannel(injector, event.ctx),
          injector.get(InvoiceService).isInvoicePluginEnabled(event.ctx),
        ]);
      if (additionalRecipients.length === 0) {
        Logger.warn(
          `No admin found to send confirmation email for channel ${channel.code}`,
          loggerCtx
        );
      }
      let invoiceLink;
      if (invoicesEnabled) {
        invoiceLink = `${process.env.VENDURE_HOST}/invoices/${channel.token}/${event.order.code}?email=${event.order.customer?.emailAddress}`;
      }
      const ebooks = EBookController.getEbookLinks(event.ctx, event.order);
      Logger.info(
        `Sending order confirmation email to ${event.order.customer?.emailAddress} for channel ${channel.code}`,
        loggerCtx
      );
      logOrderHistory(
        event.ctx,
        injector,
        event.order.id,
        `Sent order confirmation email to ${event.order.customer?.emailAddress} via email ${sender.emailAddress}`
      ).catch(() => {
        Logger.warn(
          `Failed to log email-sent history entry for order ${event.order.code}`,
          loggerCtx
        );
      });
      return {
        channelName: channel.code,
        additionalRecipients,
        invoiceLink,
        ebooks,
        subject,
        fromAddress: `"${sender.name}" <${sender.emailAddress}>`,
      };
    })
    .setRecipient((event) => event.order.customer!.emailAddress)
    .setOptionalAddressFields((event) => ({
      cc: event.data.additionalRecipients.join(','),
    }))
    .setFrom(`{{ fromAddress }}`)
    .setSubject(`{{ subject }}`)
    .setTemplateVars((event) => {
      return {
        order: event.order,
        summary: TaxHelper.getTaxSummary(event.order),
        ...event.data,
      };
    })
    // Only used for testing emails with devMode:true
    .setMockEvent(mockOrderStateTransitionEvent);
