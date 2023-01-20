<template>
  <Layout #content>
    <div>
      <Newsletter />
      <h3>Thank you for ordering!</h3>
      <div class="has-text-centered">
        <video playsinline autoplay muted loop style="max-width: 800px">
          <source src="/video/shipping.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="columns">
        <div class="column is-8">
          <template v-if="loading">
            <b-skeleton :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
            <b-skeleton :animated="true"></b-skeleton>
          </template>
          <template v-if="failed">
            <b-notification
              type="is-danger"
              aria-close-label="Close notification"
            >
              Something went wrong. Please contact us and mention your order
              number: {{ $route.params.code }}
            </b-notification>
          </template>
          <template v-if="order">
            <OrderSummary class="mb-5" :order="order" />
            <h4>Items</h4>
            <CartItemsTable disabled :active-order="order" />
          </template>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
import Newsletter from '../components/Newsletter';
import { getOrderByCode } from 'pinelab-storefront';
import OrderSummary from 'pinelab-storefront/lib/components/OrderSummary';
import CartItemsTable from 'pinelab-storefront/lib/components/CartItemsTable';

export default {
  components: {
    Newsletter,
    OrderSummary,
    CartItemsTable,
  },
  data() {
    return {
      loading: true,
      order: undefined,
      failed: false,
    };
  },
  async mounted() {
    try {
      this.loading = true;
      this.order = await getOrderByCode(this.$vendure, this.$route.params.code);
    } catch (e) {
      console.error(e);
      this.failed = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>
