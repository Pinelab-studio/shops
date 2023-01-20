import { EmailEventHandler, EmailEventListener } from '@vendure/email-plugin';
import { ID, Logger, OrderPlacedEvent } from '@vendure/core';
import { TaxHelper } from '../tax/tax.helper';
import { InvoiceService } from 'vendure-plugin-invoices';
import { EBookController } from '../e-book/e-book.plugin';
import { EmailUtil } from './email.util';
import { logOrderHistory } from '../util/history.util';

const loggerCtx = 'OrderConfirmationHandler';

/**
 * Send email to customer AND administrators of channel
 */
export const orderConfirmationHandler: EmailEventHandler<any, any> =
  new EmailEventListener('order-confirmation')
    .on(OrderPlacedEvent)
    .loadData(async ({ event, injector }) => {
      const channel = event.ctx.channel;
      const [{ sender, additionalRecipients }, invoicesEnabled] =
        await Promise.all([
          EmailUtil.getAdminEmailAddressesForChannel(injector, event.ctx),
          injector
            .get(InvoiceService)
            .isInvoicePluginEnabled(channel.id as string),
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
        `Sent order confirmation email to ${event.order.customer?.emailAddress}`
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
        fromAddress: `"${sender.name}" <${sender.emailAddress}>`,
      };
    })
    .setRecipient((event) => event.order.customer!.emailAddress)
    .setOptionalAddressFields((event) => ({
      cc: event.data.additionalRecipients.join(','),
    }))
    .setFrom(`{{ fromAddress }}`)
    .setSubject(
      `Bedankt voor je bestelling bij {{ channelName }} met nr. {{ order.code }}`
    )
    .setTemplateVars((event) => {
      return {
        order: event.order,
        summary: TaxHelper.getTaxSummary(event.order),
        ...event.data,
      };
    })
    .addTemplate({
      languageCode: 'default',
      channelCode: 'Pinelab Demo',
      subject:
        'Bedankt voor de Test bestelling {{ order.code }} bij de Pinelab demo shop ',
      templateFile: 'body.hbs',
    })
    .addTemplate({
      languageCode: 'default',
      channelCode: 'Op!',
      subject: 'Je e-boek Op! van Jet van Nieuwkerk',
      templateFile: 'body.hbs',
    })
    .addTemplate({
      languageCode: 'default',
      channelCode: '__default_channel__',
      subject: 'Bedankt voor je bestelling bij Wormenkwekerij Wasse',
      templateFile: 'body.hbs',
    });
