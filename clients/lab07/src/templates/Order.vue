<template>
  <DefaultLayout>
    <div>
      <h3>Bedankt voor je bestelling!</h3>
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
              Er is iets misgegaan, neem a.u.b. contact met ons op en vermeld
              het bestelnummer: {{ $route.params.code }}
            </b-notification>
          </template>
          <template v-if="order">
            <OrderSummary class="mb-5" :order="order" />
            <h4>Je hebt besteld:</h4>
            <CartItemsTable disabled :active-order="order" />
          </template>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script>
import { getOrderByCode } from 'pinelab-storefront';
import OrderSummary from 'pinelab-storefront/lib/components/OrderSummary';
import CartItemsTable from 'pinelab-storefront/lib/components/CartItemsTable';

export default {
  components: {
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
