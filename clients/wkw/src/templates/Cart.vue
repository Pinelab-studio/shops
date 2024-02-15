<template>
  <DefaultLayout>
    <template #content>
      <div
        class="checkout-steps"
        v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0"
      >
        <div class="columns is-mobile">
          <div class="column">
            <h3>{{ $l('basket.title') }}</h3>
          </div>
          <div class="column has-text-right">
            <g-link :to="$context.checkoutUrl" class="button">
              {{ $l('basket.go-to-checkout') }}
            </g-link>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8">
            <CartItemsTable :active-order="activeOrder" :vendure="$vendure" />
          </div>
          <div class="column is-4">
            <OrderSummary class="mb-5" :order="activeOrder">
              <template #middle>
                <CouponInput
                  class="pt-2"
                  :vendure="$vendure"
                  :applied-coupons="activeOrder.couponCodes"
                />
              </template>
              <template #bottom>
                <br />
                <g-link :to="$context.checkoutUrl" class="button is-fullwidth">
                  {{ $l('basket.go-to-checkout') }}
                </g-link>
                <div class="has-text-centered pt-4">
                  <g-link :to="$context.homeUrl">{{
                    $l('basket.continue')
                  }}</g-link>
                </div>
              </template>
            </OrderSummary>
            <CartNotification />
            <h5>{{ $l('order-summary.payments') }}</h5>
            <img src="/img/payments.png" alt="Betaalmogelijkheden" />
          </div>
        </div>
      </div>
      <div v-else style="height: 50vh">
        {{ $l('basket.empty-cart') }}
      </div>
    </template>
  </DefaultLayout>
</template>
<script>
import CartItemsTable from 'pinelab-storefront/lib/components/CartItemsTable';
import OrderSummary from 'pinelab-storefront/lib/components/OrderSummary';
import CouponInput from 'pinelab-storefront/lib/components/CouponInput';
import CartNotification from '../components/CartNotification';

export default {
  components: {
    CartItemsTable,
    OrderSummary,
    CouponInput,
    CartNotification,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
  },
};
</script>
