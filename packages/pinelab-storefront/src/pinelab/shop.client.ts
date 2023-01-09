import { gql } from 'graphql-request';
import { Store, VendureClient } from '../vendure/vendure.client';
import {
  AdditionalCollectionFieldsFragment,
  AdditionalOrderFieldsFragment,
  AdditionalProductFieldsFragment,
  CreateCoinbasePaymentIntentMutation,
  CreateMolliePaymentIntentMutation,
  CreateMolliePaymentIntentMutationVariables,
  DutchAddressLookupQuery,
  DutchAddressLookupQueryVariables,
  DutchPostalCodeInput,
  MolliePaymentIntent,
  MyparcelDropOffPoint,
  MyparcelDropOffPointInput,
  MyparcelDropOffPointsQuery,
  MyparcelDropOffPointsQueryVariables,
  OrderFieldsFragment,
  SetOrderCustomFieldsMutation,
  SetOrderCustomFieldsMutationVariables,
  UpdateOrderCustomFieldsInput,
} from '../generated/graphql';

const additionalCollectionFields = gql`
  fragment AdditionalCollectionFields on Collection {
    id
    featuredAsset {
      thumbnail
    }
  }
`;

const additionalProductFields = gql`
  fragment AdditionalProductFields on Product {
    assets {
      thumbnail
    }
    featuredAsset {
      thumbnail
    }
    variants {
      assets {
        thumbnail
      }
      featuredAsset {
        thumbnail
      }
      customFields {
        maxPerOrder
      }
    }
    customFields {
      metaTitle
      metaDescription
      keywords
    }
  }
`;

const additionalOrderFields = gql`
  fragment AdditionalOrderFields on Order {
    id
    lines {
      featuredAsset {
        thumbnail
      }
    }
  }
`;

/**
 * A Vendure client tailored to fetch all fields from the Pinelab Shops Vendure instance.
 * For generic projects use {@link VendureClient}
 */
export class ShopClient extends VendureClient<
  AdditionalCollectionFieldsFragment,
  AdditionalProductFieldsFragment,
  AdditionalOrderFieldsFragment
> {
  constructor(
    store: Store<AdditionalOrderFieldsFragment>,
    url: string,
    channelToken: string
  ) {
    super(store, url, channelToken, {
      additionalCollectionFields,
      additionalProductFields,
      additionalOrderFields,
    });
  }

  async setDefaultShippingMethod() {
    await super.setDefaultShippingMethod();
    await this.unsetPickupLocation();
  }

  async unsetPickupLocation(): Promise<OrderFieldsFragment> {
    // null is needed, otherwise it cannot be unset
    return this.setPickupLocationOnOrder({
      // @ts-ignore
      pickupLocationNumber: null, // @ts-ignore
      pickupLocationCarrier: null, // @ts-ignore
      pickupLocationName: null, // @ts-ignore
      pickupLocationStreet: null, // @ts-ignore
      pickupLocationHouseNumber: null, // @ts-ignore
      pickupLocationZipcode: null, // @ts-ignore
      pickupLocationCity: null, // @ts-ignore
      pickupLocationCountry: null, // @ts-ignore
    });
  }

  async getDropOffPoints(
    input: MyparcelDropOffPointInput
  ): Promise<MyparcelDropOffPoint[]> {
    const { myparcelDropOffPoints } = await this.request<
      MyparcelDropOffPointsQuery,
      MyparcelDropOffPointsQueryVariables
    >(this.queries.GET_DROP_OFF_POINTS, { input });
    return myparcelDropOffPoints;
  }

  async setPickupLocationOnOrder(
    customFields: UpdateOrderCustomFieldsInput
  ): Promise<OrderFieldsFragment> {
    const { setOrderCustomFields: order } = await this.request<
      SetOrderCustomFieldsMutation,
      SetOrderCustomFieldsMutationVariables
    >(this.queries.SET_PICKUP_LOCATION_FOR_ORDER, { customFields });
    await this.validateResult(order);
    this.store.activeOrder = order as OrderFieldsFragment;
    return order as OrderFieldsFragment;
  }

  async lookupAddress(
    input: DutchPostalCodeInput
  ): Promise<DutchAddressLookupQuery['dutchAddressLookup'] | undefined> {
    const { dutchAddressLookup } = await this.request<
      DutchAddressLookupQuery,
      DutchAddressLookupQueryVariables
    >(this.queries.GET_DUTCH_ADDRESS, {
      input,
    });
    return dutchAddressLookup;
  }

  async createMolliePaymentIntent(code: string): Promise<string> {
    const { createMolliePaymentIntent } = await this.request<
      CreateMolliePaymentIntentMutation,
      CreateMolliePaymentIntentMutationVariables
    >(this.queries.CREATE_MOLLIE_PAYMENT_INTENT, {
      input: { paymentMethodCode: code },
    });
    await this.validateResult(createMolliePaymentIntent);
    return (createMolliePaymentIntent as MolliePaymentIntent).url;
  }

  async createCoinbasePaymentIntent(): Promise<string> {
    const { createCoinbasePaymentIntent } =
      await this.request<CreateCoinbasePaymentIntentMutation>(
        this.queries.CREATE_COINBASE_PAYMENT_INTENT
      );
    await this.validateResult(createCoinbasePaymentIntent);
    return createCoinbasePaymentIntent;
  }

  /**
   * Redirects a user to the given payment platform
   */
  async startPayment(
    method: 'mollie' | 'coinbase',
    paymentMethodCode?: string
  ) {
    if (method === 'mollie' && !paymentMethodCode) {
      throw Error(`Need paymentMethodCode for mollie payment`);
    } else if (method === 'mollie') {
      const redirectUrl = await this.createMolliePaymentIntent(
        paymentMethodCode!
      );
      window.location.replace(redirectUrl);
    } else if (method === 'coinbase') {
      const redirectUrl = await this.createCoinbasePaymentIntent();
      window.location.replace(redirectUrl);
    } else {
      throw Error(`Invalid payment method given: ${method}`);
    }
  }
}
