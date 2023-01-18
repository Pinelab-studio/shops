import {
  Administrator,
  ID,
  Injector,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';

export class EmailUtil {
  static async getAdminEmailsForChannel(
    injector: Injector,
    ctx: RequestContext
  ): Promise<string[]> {
    const admins = await injector
      .get(TransactionalConnection)
      .getRepository(ctx, Administrator)
      .createQueryBuilder('admin')
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
    return admins
      .filter((admin: any) => admin.admin_emailAddress.includes('@'))
      .map((admin: any) => admin.admin_emailAddress);
  }
}
