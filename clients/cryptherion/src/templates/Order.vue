<template>
  <Layout>
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
            Er is iets misgegaan, neem contact op met ons en vermeld je
            bestelnummer: {{ $route.params.code }}
          </b-notification>
        </template>
        <template v-if="order">
          <b-notification type="is-info" aria-close-label="Close notification">
            Je bestelling wordt verwerkt.

            <br />
            <br />
            Heb je met crypto betaald? Dan kan het even duren voordat je
            transactie is bevestigd. Je krijg een bevestigingsmail wanneer de
            transactie is verwerkt.
          </b-notification>
          <OrderSummary class="mb-5" :order="order" />
          <h4>Je hebt besteld:</h4>
          <CartItemsTable disabled :active-order="order" />
        </template>
      </div>
    </div>
  </Layout>
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
