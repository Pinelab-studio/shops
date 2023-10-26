import {
  VendureServer,
  ShopData,
  VendureClient,
} from '../../pinelab-storefront/src';
import { startDevServer, TestEnv } from '../../../vendure/test/dev-server';
import { LocalStorageMock } from './mockWindow';
import { describe, beforeAll, afterAll, it, expect } from 'vitest';

describe('Test pinelab-storefront to Vendure communication', () => {
  let vendureServer: VendureServer;
  let vendureClient: VendureClient;
  const channelToken = 'default-channel';
  let shopData: ShopData;
  let adminClient: TestEnv['adminClient'];
  let shopClient: TestEnv['shopClient'];
  let server: TestEnv['server'];

  beforeAll(async () => {
    ({ adminClient, shopClient, server } = await startDevServer());
    vendureServer = new VendureServer(
      'http://localhost:3000/shop-api',
      channelToken
    );
    vendureClient = new VendureClient(
      { activeOrder: undefined },
      'http://localhost:3000/shop-api',
      channelToken
    );
    // Mock window object
    global.window = {
      localStorage: new LocalStorageMock(),
    } as any;
  }, 60000);

  afterAll(async () => {
    await server.destroy();
  });

  it('Started the server', async () => {
    expect(server.app.getHttpServer()).toBeDefined();
  });

  describe('Storefront server side fetching', () => {
    it('Fetched shopdata', async () => {
      shopData = await vendureServer.getShopData();
    });

    it('Has collections', async () => {
      const unflattenedCollections = vendureServer.unflatten(
        shopData.collections
      );
      expect(shopData.collections.length).toBe(1);
      expect(unflattenedCollections.length).toBe(1);
    });

    it('Has products', async () => {
      expect(shopData.products.length).toBe(1);
      expect(shopData.products[0].soldOut).toEqual(false);
      expect(typeof shopData.products[0].lowestPrice).toBe('number');
    });

    it('Has products per collection', async () => {
      expect(Array.isArray(shopData.productsPerCollection[0].products)).toBe(
        true
      );
      expect(shopData.productsPerCollection[0].collection.name).toBeDefined();
    });

    it('Has available countries', async () => {
      expect(Array.isArray(shopData.availableCountries)).toBe(true);
      expect(shopData.availableCountries.length).toBe(1);
    });
  });

  describe('Storefront client side', () => {
    it('Adds product to order', async () => {
      const order = await vendureClient.addProductToCart('1', 1);
      expect(order.lines.length).toBe(1);
    });

    it('Has default shipping', async () => {
      const order = await vendureClient.getActiveOrder();
      expect(order?.shippingWithTax).toBe(500);
    });

    it('Sets address', async () => {
      let order = await vendureClient.setCustomerForOrder({
        emailAddress: 'martijn@pinelab.studio',
        firstName: 'test',
        lastName: 'last',
      });
      order = await vendureClient.setOrderShippingAddress({
        countryCode: 'NL',
        city: 'Test',
        postalCode: 'zipcode',
        streetLine1: 'Street',
      });
      expect(order.shippingAddress?.country).toBe('Nederland');
      expect(order.customer?.emailAddress).toBe('martijn@pinelab.studio');
    });

    it('Has NL zone shipping', async () => {
      const order = await vendureClient.getActiveOrder();
      expect(order?.shippingWithTax).toBe(600);
    });

    it('Has correct tax rates', async () => {
      const order = await vendureClient.getActiveOrder();
      expect(order?.taxSummary[0].taxRate).toBe(21); // For products
      expect(order?.taxSummary[1].taxRate).toBe(21); // For shipping
      expect(order?.taxSummary.length).toBe(2);
    });
  });

  // describe('Vendure admin', () => {
  //   TODO
  //   TaxSummary voor confirmation email
  //   Taxsummary voor invoice
  //   Allocate stock on settlement
  //   TaxExport strategy
  // });
});
