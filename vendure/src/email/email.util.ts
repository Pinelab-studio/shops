import {
  Administrator,
  ID,
  Injector,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';

export interface ChannelEmailAdresses {
  sender: {
    name: string;
    emailAddress: string;
  };
  additionalRecipients: string[];
}

export class EmailUtil {
  /**
   * Get sender and additional recipients for a given channel
   */
  static async getAdminEmailAddressesForChannel(
    injector: Injector,
    ctx: RequestContext
  ): Promise<ChannelEmailAdresses> {
    const admins = await injector
      .get(TransactionalConnection)
      .getRepository(ctx, Administrator)
      .createQueryBuilder('admin')
      .where('admin.deletedAt IS NULL')
      .innerJoin('admin.user', 'user')
      .innerJoin('user.roles', 'role')
      .innerJoinAndSelect(
        'role.channels',
        'channel',
        'channel.id = :channelId',
        {
          channelId: ctx.channelId,
        }
      )
      .execute();
    const sender = admins.find(
      (admin: any) => admin.admin_lastName === 'email-sender'
    );
    const additionalRecipients = admins.filter(
      (admin: any) => admin.admin_emailAddress !== sender?.admin_emailAddress
    );
    return {
      sender: {
        name: sender?.admin_firstName || 'Webshop',
        emailAddress: sender?.admin_emailAddress || 'noreply@pinelab.studio',
      },
      additionalRecipients: additionalRecipients
        .filter((admin: any) => admin.admin_emailAddress.includes('@'))
        .map((admin: any) => admin.admin_emailAddress),
    };
  }
}
