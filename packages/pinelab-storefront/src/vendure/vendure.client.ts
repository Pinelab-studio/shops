import { GraphQLClient } from 'graphql-request';
import {
  ActiveOrderQuery,
  AdditemToOrderMutation,
  AdditemToOrderMutationVariables,
  AdjustOrderLineMutation,
  AdjustOrderLineMutationVariables,
  AllProductsQuery,
  AllProductsQueryVariables,
  ApplyCouponCodeMutation,
  ApplyCouponCodeMutationVariables,
  AvailableCountriesQuery,
  CollectionFieldsFragment,
  CollectionsQuery,
  CollectionsQueryVariables,
  CreateAddressInput,
  CreateCustomerInput,
  EligibleShippingMethodsQuery,
  NextOrderStatesQuery,
  OrderByCodeQuery,
  OrderByCodeQueryVariables,
  OrderFieldsFragment,
  ProductFieldsFragment,
  RemoveAllOrderLinesMutation,
  RemoveCouponCodeMutation,
  RemoveCouponCodeMutationVariables,
  SetCustomerForOrderMutation,
  SetCustomerForOrderMutationVariables,
  SetOrderBillingAddressMutation,
  SetOrderBillingAddressMutationVariables,
  SetOrderShippingAddressMutation,
  SetOrderShippingAddressMutationVariables,
  SetOrderShippingMethodMutation,
  SetOrderShippingMethodMutationVariables,
  StockLevelProductsQuery,
  StockLevelProductsQueryVariables,
  TransitionOrderToStateMutation,
  TransitionOrderToStateMutationVariables,
} from '../generated/graphql';
import {
  BasicCollection,
  CatalogData,
  CollectionMap,
  Store,
  VendureError,
} from './types';
import { getVendureQueries } from './vendure.queries';
import { setCalculatedFields } from '../util/product.util';
import { getProductsForCollection } from '../util/collection.util';

export interface AdditionalVendureFields {
  additionalCollectionFields?: string;
  additionalProductFields?: string;
  additionalOrderFields?: string;
}

export type ExtendedCollection<T> = T & CollectionFieldsFragment;
export type ExtendedProduct<T> = T & ProductFieldsFragment;
export type ExtendedOrder<T> = T & OrderFieldsFragment;

/**
 * Graphql client for Vendure
 *
 * Pass types of your additional Collection, Product and Order fields as generic types
 * to make this client return your extended types.
 */
export class VendureClient<C = {}, P = {}, O = {}> {
  client: GraphQLClient;
  tokenName = 'vendure-auth-token';
  protected queries: ReturnType<typeof getVendureQueries>;

  constructor(
    protected store: Store<O>,
    protected url: string,
    protected channelToken: string,
    additionalGraphqlFields?: AdditionalVendureFields
  ) {
    this.client = new GraphQLClient(url, {
      headers: { 'vendure-token': channelToken },
    });
    this.queries = getVendureQueries(additionalGraphqlFields);
  }

  async getActiveOrder(): Promise<ExtendedOrder<O> | undefined> {
    const { activeOrder } = await this.request<ActiveOrderQuery>(
      this.queries.GET_ACTIVE_ORDER
    );
    this.store.activeOrder = activeOrder as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  /**
   * Get all products, but only ID, slug and variant price and stockLevel
   */
  async getStockForProducts(
    productIds: string[]
  ): Promise<StockLevelProductsQuery['products']['items']> {
    const {
      products: { items },
    } = await this.request<
      StockLevelProductsQuery,
      StockLevelProductsQueryVariables
    >(this.queries.GET_PRICE_AND_STOCKLEVEL, {
      options: { filter: { id: { in: productIds } } },
    });
    return items;
  }

  @NoConcurrentRequests()
  async addProductToCart(
    productVariantId: string,
    quantity: number
  ): Promise<ExtendedOrder<O>> {
    const { addItemToOrder } = await this.request<
      AdditemToOrderMutation,
      AdditemToOrderMutationVariables
    >(this.queries.ADD_ITEM_TO_ORDER, {
      productVariantId,
      quantity,
    });
    await this.validateResult(addItemToOrder);
    this.store.activeOrder = addItemToOrder as ExtendedOrder<O>;
    await this.setDefaultShippingMethod();
    return addItemToOrder as ExtendedOrder<O>;
  }

  /**
   * Sets the first eligible shipping method with 'default' in its code
   * If not found, it sets the first eligible method
   */
  async setDefaultShippingMethod(): Promise<void> {
    const methods = await this.getEligibleShippingMethods();
    const selectedShippingMethodId =
      this.store.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    const isSelectedEligible = methods.some(
      (method) => method.id === selectedShippingMethodId
    );
    if (isSelectedEligible) {
      return; // Selected is still eligible for this order
    }
    let defaultMethod = methods.find(
      (method) => method.code?.indexOf('default') > -1
    );
    if (!defaultMethod) {
      defaultMethod = methods[0];
      console.error(`No default shipping found`);
    }
    await this.setOrderShippingMethod(defaultMethod.id);
  }

  async getEligibleShippingMethods(): Promise<
    EligibleShippingMethodsQuery['eligibleShippingMethods']
  > {
    const { eligibleShippingMethods } =
      await this.request<EligibleShippingMethodsQuery>(
        this.queries.GET_ELIGIBLESHIPPINGMETHODS
      );
    return eligibleShippingMethods;
  }

  async setOrderShippingMethod(
    shippingMethodId: string
  ): Promise<ExtendedOrder<O>> {
    const { setOrderShippingMethod } = await this.request<
      SetOrderShippingMethodMutation,
      SetOrderShippingMethodMutationVariables
    >(this.queries.SET_ORDERSHIPPINGMETHOD, {
      shippingMethodId,
    });
    await this.validateResult(setOrderShippingMethod);
    this.store.activeOrder = setOrderShippingMethod as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  @NoConcurrentRequests()
  async adjustOrderLine(
    orderLineId: string,
    quantity: number
  ): Promise<ExtendedOrder<O>> {
    const { adjustOrderLine } = await this.request<
      AdjustOrderLineMutation,
      AdjustOrderLineMutationVariables
    >(this.queries.ADJUST_ORDERLINE, { orderLineId, quantity });
    await this.validateResult(adjustOrderLine);
    this.store.activeOrder = adjustOrderLine as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async setCustomerForOrder(
    input: CreateCustomerInput
  ): Promise<ExtendedOrder<O>> {
    const { setCustomerForOrder } = await this.request<
      SetCustomerForOrderMutation,
      SetCustomerForOrderMutationVariables
    >(this.queries.SET_CUSTOMER_FOR_ORDER, { input });
    await this.validateResult(setCustomerForOrder);
    this.store.activeOrder = setCustomerForOrder as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async setOrderShippingAddress(
    input: CreateAddressInput
  ): Promise<ExtendedOrder<O>> {
    const { setOrderShippingAddress: order } = await this.request<
      SetOrderShippingAddressMutation,
      SetOrderShippingAddressMutationVariables
    >(this.queries.SET_ORDERSHIPPINGADDRESS, { input });
    await this.validateResult(order);
    this.store.activeOrder = order as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async setOrderBillingAddress(
    input: CreateAddressInput
  ): Promise<ExtendedOrder<O>> {
    const { setOrderBillingAddress: order } = await this.request<
      SetOrderBillingAddressMutation,
      SetOrderBillingAddressMutationVariables
    >(this.queries.SET_ORDERBILLINGADDRESS, { input });
    await this.validateResult(order);
    this.store.activeOrder = order as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async getNextOrderStates(): Promise<string[]> {
    const { nextOrderStates } = await this.request<NextOrderStatesQuery>(
      this.queries.GET_NEXT_ORDERSTATES
    );
    return nextOrderStates;
  }

  async transitionOrderToState(state: string): Promise<ExtendedOrder<O>> {
    const { transitionOrderToState } = await this.request<
      TransitionOrderToStateMutation,
      TransitionOrderToStateMutationVariables
    >(this.queries.TRANSITION_ORDER_TO_STATE, { state });
    await this.validateResult(transitionOrderToState);
    this.store.activeOrder = transitionOrderToState as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async getOrderByCode(code: string): Promise<ExtendedOrder<O> | undefined> {
    const { orderByCode } = await this.request<
      OrderByCodeQuery,
      OrderByCodeQueryVariables
    >(this.queries.GET_ORDER_BY_CODE, { code });
    return orderByCode as ExtendedOrder<O>;
  }

  async applyCouponCode(couponCode: string): Promise<ExtendedOrder<O>> {
    const { applyCouponCode: order } = await this.request<
      ApplyCouponCodeMutation,
      ApplyCouponCodeMutationVariables
    >(this.queries.APPLY_COUPON_CODE, {
      couponCode,
    });
    await this.validateResult(order);
    this.store.activeOrder = order as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  async removeCouponCode(
    couponCode: string
  ): Promise<ExtendedOrder<O> | undefined> {
    const { removeCouponCode: order } = await this.request<
      RemoveCouponCodeMutation,
      RemoveCouponCodeMutationVariables
    >(this.queries.REMOVE_COUPON_CODE, {
      couponCode,
    });
    if (order) {
      this.store.activeOrder = order as ExtendedOrder<O>;
      return this.store.activeOrder;
    }
  }

  async removeAllOrderLines(): Promise<ExtendedOrder<O>> {
    const { removeAllOrderLines: order } =
      await this.request<RemoveAllOrderLinesMutation>(
        this.queries.REMOVE_ALL_ORDER_LINES
      );
    await this.validateResult(order);
    this.store.activeOrder = order as ExtendedOrder<O>;
    return this.store.activeOrder;
  }

  /**
   * Resource heavy! Fetches all products and collections from Vendure.
   * Should only be used for SSG
   */
  async getCompleteCatalog(): Promise<CatalogData> {
    let [collectionList, allProducts] = await Promise.all([
      this.getAllCollections(),
      this.getAllProducts(),
    ]);
    const products = allProducts.map((p) => setCalculatedFields(p));
    products.map((p) => (p.soldOut = false));

    const productsPerCollection: CollectionMap[] = collectionList.map(
      (collection) => {
        const products = getProductsForCollection(collection, allProducts);
        return {
          collection: { ...collection, productVariants: undefined },
          products,
        };
      }
    );
    const collections: BasicCollection[] = collectionList.map((c) => ({
      ...c,
      productVariants: undefined,
    }));
    return {
      products,
      productsPerCollection,
      collections,
    };
  }

  /**
   * Resource heavy! Fetches all collections with all childCollections
   * Should only be used for SSG
   */
  async getAllCollections(): Promise<CollectionFieldsFragment[]> {
    const {
      collections: { items },
    } = await this.client.request<CollectionsQuery, CollectionsQueryVariables>(
      this.queries.GET_COLLECTIONS
    );
    return items;
  }

  /**
   * Resource heavy! Fetches all products in batches
   * Should only be used for SSG
   */
  async getAllProducts(): Promise<ProductFieldsFragment[]> {
    const products: ProductFieldsFragment[] = [];
    let hasMore = true;
    let page = 1;
    let skip = 0;
    const take = 500;
    while (hasMore) {
      const { products: productList } = await this.client.request<
        AllProductsQuery,
        AllProductsQueryVariables
      >(this.queries.GET_PRODUCTS, {
        options: {
          skip,
          take,
        },
      });
      products.push(...productList.items);
      skip = page * take;
      page++;
      hasMore = productList.totalItems > products.length;
    }
    return products;
  }

  /**
   * Get list of available countries
   */
  async getAvailableCountries(): Promise<
    AvailableCountriesQuery['availableCountries']
  > {
    const { availableCountries } =
      await this.client.request<AvailableCountriesQuery>(
        this.queries.GET_AVAILABLE_COUNTRIES
      );
    return availableCountries;
  }

  async validateResult(result: any): Promise<void> {
    if (result && result.errorCode) {
      if (
        result.errorCode === 'ORDER_MODIFICATION_ERROR' ||
        result.errorCode === 'ORDER_PAYMENT_STATE_ERROR'
      ) {
        window.localStorage.removeItem(this.tokenName); // These are unrecoverable states, so remove activeOrder
      }
      if (result.errorCode === 'INSUFFICIENT_STOCK_ERROR') {
        // Fetch activeOrder to view amount of items added after insufficient stock error
        await this.getActiveOrder();
      }
      throw new VendureError(
        `${result.errorCode} - ${result.message}`,
        this.store.activeOrder?.code,
        result.errorCode
      );
    }
  }

  async request<T = void, I = void>(
    document: string,
    variables?: I
  ): Promise<T> {
    if (window?.localStorage) {
      // Make sure we send auth token in request
      const token = window.localStorage.getItem(this.tokenName);
      if (token) {
        this.client.setHeader('Authorization', `Bearer ${token}`);
      }
    }
    try {
      const { data, headers } = await this.client.rawRequest(
        document,
        variables
      );
      const token = headers.get(this.tokenName);
      if (token && window?.localStorage) {
        // Make sure we save received tokens
        window.localStorage.setItem(this.tokenName, token);
      }
      return data;
    } catch (e) {
      const error = (e as any).response?.errors?.[0];
      if (error) {
        throw new VendureError(
          error.message,
          undefined,
          error.extensions?.code
        );
      }
      throw e;
    }
  }
}

let locked = false;

/**
 * Awaits other requests to finish before firing a new request.
 * Requests are globally locked: if method1 acquired the lock,
 * method2 will also await the request of method1
 */
function NoConcurrentRequests() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalFunction = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      for (let i = 0; i <= 20; i++) {
        if (locked) {
          // locked, we wait
          await new Promise((resolve) => setTimeout(resolve, 200));
          console.info(`Another request in flight, waiting ${i}...`);
        } else {
          // Not locked, we acquire lock
          try {
            locked = true;
            // @ts-ignore
            return await originalFunction.apply(this, args);
          } finally {
            locked = false;
          }
        }
      }
    };
    return descriptor;
  };
}
