import { gql } from 'graphql-request';

export interface AdditionalVendureFields {
  additionalCollectionFields?: string;
  additionalProductFields?: string;
  additionalOrderFields?: string;
}
/**
 * Create Graphql queries including the given additional field fragments
 * @param additionalGraphqlFields
 */
export function getVendureQueries(
  additionalGraphqlFields?: AdditionalVendureFields
) {
  const additionalCollectionFields =
    additionalGraphqlFields?.additionalCollectionFields ||
    gql`
      fragment AdditionalCollectionFields on Collection {
        id
      }
    `;

  const additionalProductFields =
    additionalGraphqlFields?.additionalProductFields ||
    gql`
      fragment AdditionalProductFields on Product {
        id
      }
    `;

  const additionalOrderFields =
    additionalGraphqlFields?.additionalOrderFields ||
    gql`
      fragment AdditionalOrderFields on Order {
        id
      }
    `;

  const PRODUCT_FIELDS = gql`
    ${additionalProductFields}
    fragment ProductFields on Product {
      ...AdditionalProductFields
      id
      name
      slug
      assets {
        id
        preview
      }
      facetValues {
        code
        name
        facet {
          code
          name
        }
      }
      featuredAsset {
        id
        preview
      }
      description
      variants {
        id
        name
        priceWithTax
        productId
        stockLevel
        options {
          id
          name
          group {
            id
            name
          }
        }
        assets {
          id
          preview
        }
        featuredAsset {
          id
          preview
        }
      }
      customFields {
        maxPerOrder
      }
    }
  `;

  const COLLECTION_FIELDS = gql`
    ${additionalCollectionFields}
    fragment CollectionFields on Collection {
      ...AdditionalCollectionFields
      id
      name
      slug
      description
      parent {
        id
        name
        slug
      }
      children {
        id
        name
        slug
      }
      featuredAsset {
        preview
      }
      productVariants {
        items {
          product {
            id
          }
        }
      }
    }
  `;

  const ORDER_FIELDS = gql`
    ${additionalOrderFields}
    fragment OrderFields on Order {
      ...AdditionalOrderFields
      id
      code
      state
      active
      totalWithTax
      subTotalWithTax
      shippingWithTax
      customer {
        id
        firstName
        lastName
        phoneNumber
        emailAddress
      }
      shippingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        postalCode
        country
      }
      billingAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        postalCode
        country
      }
      shippingLines {
        shippingMethod {
          id
          code
          name
        }
        priceWithTax
      }
      lines {
        id
        quantity
        linePriceWithTax
        featuredAsset {
          id
          preview
        }
        productVariant {
          id
          sku
          name
          priceWithTax
        }
      }
      taxSummary {
        taxRate
        taxTotal
        taxBase
      }
      payments {
        id
        state
        errorMessage
        metadata
      }
      discounts {
        description
        amountWithTax
      }
      couponCodes
    }
  `;

  return {
    GET_PRICE_AND_STOCKLEVEL: gql`
      query stockLevelProducts($options: ProductListOptions) {
        products(options: $options) {
          items {
            id
            slug
            variants {
              id
              stockLevel
              priceWithTax
            }
          }
        }
      }
    `,
    GET_PRODUCT: gql`
      ${PRODUCT_FIELDS}
      query product($slug: String) {
        product(slug: $slug) {
          ...ProductFields
        }
      }
    `,
    ADD_ITEM_TO_ORDER: gql`
      ${ORDER_FIELDS}
      mutation additemToOrder($productVariantId: ID!, $quantity: Int!) {
        addItemToOrder(
          productVariantId: $productVariantId
          quantity: $quantity
        ) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    GET_ACTIVE_ORDER: gql`
      ${ORDER_FIELDS}
      query activeOrder {
        activeOrder {
          ...OrderFields
        }
      }
    `,
    GET_ELIGIBLESHIPPINGMETHODS: gql`
      query eligibleShippingMethods {
        eligibleShippingMethods {
          id
          price
          priceWithTax
          name
          code
          description
          metadata
        }
      }
    `,
    SET_ORDERSHIPPINGMETHOD: gql`
      ${ORDER_FIELDS}
      mutation setOrderShippingMethod($shippingMethodId: ID!) {
        setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    ADJUST_ORDERLINE: gql`
      ${ORDER_FIELDS}
      mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
        adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    SET_CUSTOMER_FOR_ORDER: gql`
      ${ORDER_FIELDS}
      mutation setCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    SET_ORDERSHIPPINGADDRESS: gql`
      ${ORDER_FIELDS}
      mutation setOrderShippingAddress($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
          ... on Order {
            ...OrderFields
          }
          ... on NoActiveOrderError {
            errorCode
            message
          }
        }
      }
    `,
    SET_ORDERBILLINGADDRESS: gql`
      ${ORDER_FIELDS}
      mutation setOrderBillingAddress($input: CreateAddressInput!) {
        setOrderBillingAddress(input: $input) {
          ... on Order {
            ...OrderFields
          }
          ... on NoActiveOrderError {
            errorCode
            message
          }
        }
      }
    `,
    GET_NEXT_ORDERSTATES: gql`
      query nextOrderStates {
        nextOrderStates
      }
    `,
    TRANSITION_ORDER_TO_STATE: gql`
      ${ORDER_FIELDS}
      mutation transitionOrderToState($state: String!) {
        transitionOrderToState(state: $state) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    CREATE_MOLLIE_PAYMENT_INTENT: gql`
      mutation createMolliePaymentIntent($input: MolliePaymentIntentInput!) {
        createMolliePaymentIntent(input: $input) {
          ... on MolliePaymentIntent {
            url
          }
          ... on MolliePaymentIntentError {
            errorCode
            message
          }
        }
      }
    `,
    CREATE_COINBASE_PAYMENT_INTENT: gql`
      mutation createCoinbasePaymentIntent {
        createCoinbasePaymentIntent
      }
    `,
    GET_ORDER_BY_CODE: gql`
      ${ORDER_FIELDS}
      query orderByCode($code: String!) {
        orderByCode(code: $code) {
          ...OrderFields
        }
      }
    `,
    GET_DUTCH_ADDRESS: gql`
      query dutchAddressLookup($input: DutchPostalCodeInput!) {
        dutchAddressLookup(input: $input) {
          street
          city
        }
      }
    `,
    APPLY_COUPON_CODE: gql`
      ${ORDER_FIELDS}
      mutation applyCouponCode($couponCode: String!) {
        applyCouponCode(couponCode: $couponCode) {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    REMOVE_ALL_ORDER_LINES: gql`
      ${ORDER_FIELDS}
      mutation removeAllOrderLines {
        removeAllOrderLines {
          ... on Order {
            ...OrderFields
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `,
    REMOVE_COUPON_CODE: gql`
      ${ORDER_FIELDS}
      mutation removeCouponCode($couponCode: String!) {
        removeCouponCode(couponCode: $couponCode) {
          ... on Order {
            ...OrderFields
          }
        }
      }
    `,
    GET_DROP_OFF_POINTS: gql`
      query myparcelDropOffPoints($input: MyparcelDropOffPointInput!) {
        myparcelDropOffPoints(input: $input) {
          location_code
          location_name
          city
          postal_code
          street
          number
          number_suffix
          phone
          reference
          available_days
          cut_off_time
          distance
          carrier_id
        }
      }
    `,
    SET_PICKUP_LOCATION_FOR_ORDER: gql`
      ${ORDER_FIELDS}
      mutation setOrderCustomFields(
        $customFields: UpdateOrderCustomFieldsInput
      ) {
        setOrderCustomFields(input: { customFields: $customFields }) {
          ... on Order {
            ...OrderFields
          }
          ... on NoActiveOrderError {
            errorCode
            message
          }
        }
      }
    `,
    GET_COLLECTIONS: gql`
      ${COLLECTION_FIELDS}
      query collections {
        collections {
          items {
            ...CollectionFields
          }
        }
      }
    `,
    GET_PRODUCTS: gql`
      ${PRODUCT_FIELDS}
      query allProducts($options: ProductListOptions) {
        products(options: $options) {
          totalItems
          items {
            ...ProductFields
          }
        }
      }
    `,
    GET_AVAILABLE_COUNTRIES: gql`
      query availableCountries {
        availableCountries {
          name
          code
        }
      }
    `,
  };
}
