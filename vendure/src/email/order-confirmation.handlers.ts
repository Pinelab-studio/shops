import {
  EmailEventHandler,
  EmailEventListener,
  EmailTemplateConfig,
} from '@vendure/email-plugin';
import {
  Administrator,
  ID,
  Injector,
  LanguageCode,
  Logger,
  OrderPlacedEvent,
  TransactionalConnection,
} from '@vendure/core';
import { TaxHelper } from '../tax/tax.helper';
import { InvoiceService } from 'vendure-plugin-invoices';
import { EBookController } from '../e-book/e-book.plugin';

interface AdminWithChannel {
  admin_emailAddress: string;
  channel_code: string;
}

const loggerCtx = 'OrderConfirmationHandler';

/**
 * Send email to customer AND administrators of channel
 */
export const orderConfirmationHandler: EmailEventHandler<any, any> =
  new EmailEventListener('order-confirmation')
    .on(OrderPlacedEvent)
    .loadData(async ({ event, injector }) => {
      const channel = event.ctx.channel;
      let [admins, invoicesEnabled] = await Promise.all([
        getAdminsForChannel(injector, channel.id),
        injector
          .get(InvoiceService)
          .isInvoicePluginEnabled(channel.id as string),
      ]);
      const channelName = admins?.[0]?.channel_code;
      admins = admins.filter((admin) => admin.admin_emailAddress.includes('@'));
      if (!admins?.[0]?.admin_emailAddress) {
        Logger.warn(
          `No admin found to send confirmation email for channel with id ${channel.id}`,
          loggerCtx
        );
      }
      const adminRecipients = admins.map((admin) => admin.admin_emailAddress);
      let invoiceLink;
      if (invoicesEnabled) {
        invoiceLink = `${process.env.VENDURE_HOST}/invoices/${channel.token}/${event.order.code}?email=${event.order.customer?.emailAddress}`;
      }
      const ebooks = EBookController.getEbookLinks(event.ctx, event.order);
      Logger.info(
        `Sending order confirmation email to ${event.order.customer?.emailAddress} for channel ${channelName}`,
        loggerCtx
      );
      return { channelName, adminRecipients, invoiceLink, ebooks };
    })
    .setRecipient(
      (event) =>
        `${
          event.order.customer!.emailAddress
        },${event.data.adminRecipients.join(',')}`
    )
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
    });

async function getAdminsForChannel(
  injector: Injector,
  channelId: ID
): Promise<AdminWithChannel[]> {
  return injector
    .get(TransactionalConnection)
    .getRepository(Administrator)
    .createQueryBuilder('admin')
    .innerJoin('admin.user', 'user')
    .innerJoin('user.roles', 'role')
    .innerJoinAndSelect('role.channels', 'channel', 'channel.id = :channelId', {
      channelId,
    })
    .execute();
}
