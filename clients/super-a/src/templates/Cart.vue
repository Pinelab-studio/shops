<template>
  <Layout #content>
    <div>
      <div
        v-if="activeOrder && activeOrder.lines && activeOrder.lines.length > 0"
      >
        <div class="columns">
          <div class="column is-mobile"><h3>Shoppingcart</h3></div>
          <div class="column is-mobile has-text-right">
            <g-link to="/checkout/" class="button"> Order now </g-link>
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
                <g-link to="/checkout/" class="button is-fullwidth">
                  Order now
                </g-link>
                <div class="has-text-centered pt-4">
                  <g-link to="/">Continue shopping</g-link>
                </div>
              </template>
            </OrderSummary>
          </div>
        </div>
      </div>
      <div v-else style="height: 50vh">
        <br />
        <br />
        You don't have any items in your cart yet...
      </div>
    </div>
  </Layout>
</template>
<script>
import CartItemsTable from 'pinelab-storefront/lib/components/CartItemsTable';
import OrderSummary from 'pinelab-storefront/lib/components/OrderSummary';
import CouponInput from 'pinelab-storefront/lib/components/CouponInput';

export default {
  components: {
    CartItemsTable,
    OrderSummary,
    CouponInput,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder || {};
    },
  },
};
</script>
