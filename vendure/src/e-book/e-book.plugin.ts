import {
  Asset,
  AssetService,
  ChannelService,
  ConfigService,
  EntityHydrator,
  Logger,
  Order,
  OrderService,
  PluginCommonModule,
  RequestContext,
  VendurePlugin,
} from '@vendure/core';
import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import AdmZip from 'adm-zip';
import { Readable } from 'stream';

const loggerCtx = 'EBookPlugin';
export interface EBook {
  title: string;
  downloadLink: string;
}

@Controller('e-book')
export class EBookController {
  constructor(
    private orderService: OrderService,
    private hydrator: EntityHydrator,
    private channelService: ChannelService,
    private assetService: AssetService,
    private configService: ConfigService
  ) {}

  @Get('/:channelToken/:orderCode')
  async download(
    @Param('channelToken') channelToken: string,
    @Param('orderCode') orderCode: string,
    @Query('email') customerEmail: string,
    @Query('ebook') variantId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    Logger.info(
      `Attempted E-book download: variantId=${variantId}, orderCode=${orderCode}, channelToken=${channelToken}, email=${customerEmail} from ip ${ip}`,
      loggerCtx
    );
    const ctx = await this.createCtx(channelToken);
    const order = await this.orderService.findOneByCode(ctx, orderCode);
    if (!order) {
      Logger.warn(`No order exists with code ${orderCode}`, loggerCtx);
      throw new ForbiddenException();
    }
    if (order.customer?.emailAddress !== customerEmail) {
      Logger.warn(
        `Customer ${customerEmail} does not belong to order ${orderCode}`,
        loggerCtx
      );
      throw new ForbiddenException();
    }
    await this.hydrator.hydrate(ctx, order, {
      relations: ['lines.productVariant.product.facetValues.facet'],
    });
    const variant = order.lines.find(
      (line) => line.productVariant.id == variantId
    )?.productVariant;
    if (!variant) {
      Logger.warn(
        `Variant ${variantId} does not exist for order ${orderCode}`,
        loggerCtx
      );
      throw new ForbiddenException();
    }
    const facetValues = variant.product.facetValues.filter(
      (facetValue) => facetValue.facet.code === 'e-book'
    );
    const assets: Asset[] = [];
    for (const facetValue of facetValues) {
      const assetId = facetValue.code;
      const asset = await this.assetService.findOne(ctx, assetId);
      if (!asset) {
        Logger.warn(`No asset found with id ${assetId}`, loggerCtx);
        throw new ForbiddenException();
      }
      assets.push(asset);
    }
    if (assets.length === 1) {
      // Stream single ebook
      const asset = assets[0];
      const stream =
        await this.configService.assetOptions.assetStorageStrategy.readFileToStream(
          asset.source
        );
      res.set({
        'Content-Type': asset.mimeType,
      });
      Logger.info(`E-book downloaded for order ${orderCode}`, loggerCtx);
      return stream.pipe(res);
    }
    // Else, zip multiple ebooks
    Logger.info(
      `Packaging ${assets.length} e-books for order ${orderCode} and variant ${variantId} into zip.`,
      loggerCtx
    );
    const zip = new AdmZip();
    for (const asset of assets) {
      const buffer =
        await this.configService.assetOptions.assetStorageStrategy.readFileToBuffer(
          asset.source
        );
      zip.addFile(asset.name, buffer);
    }
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${variant.name}-e-books.zip"`,
    });
    Logger.info(
      `${assets.length} E-books downloaded as zip for order ${orderCode}`,
      loggerCtx
    );
    return Readable.from(zip.toBuffer()).pipe(res);
  }

  static getEbookLinks(ctx: RequestContext, order: Order): EBook[] | undefined {
    try {
      const lines = order.lines.filter(
        (line) => line.productVariant.sku.indexOf('e-book') > -1
      );
      if (!lines.length) {
        return undefined;
      }
      // Example link http://localhost:3000/e-book/op/1JU7M7C55SQFW94V?email=martijn@pinelab.studioo&ebook=4504
      return lines.map((line) => ({
        title: line.productVariant.name,
        downloadLink: `${EBookPlugin.vendureHost}/e-book/${ctx.channel.token}/${order.code}?email=${order.customer?.emailAddress}&ebook=${line.productVariant.id}`,
      }));
    } catch (e) {
      Logger.error(
        `Failed to getEbookLinkst() for order ${order.code}`,
        loggerCtx
      );
    }
  }

  private async createCtx(channelToken: string): Promise<RequestContext> {
    const channel = await this.channelService.getChannelFromToken(channelToken);
    return new RequestContext({
      apiType: 'admin',
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: channel.defaultLanguageCode,
    });
  }
}

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [EBookController],
})
export class EBookPlugin {
  static vendureHost: string;

  static init(vendureHost: string): typeof EBookPlugin {
    this.vendureHost = vendureHost;
    return EBookPlugin;
  }
}
