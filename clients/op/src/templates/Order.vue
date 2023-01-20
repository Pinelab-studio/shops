<template>
  <Layout>
    <div>
      <div class="columns is-centered">
        <div class="column is-8">
          <br />
          <h3>Bedankt voor je bestelling!</h3>
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
              Er is helaas iets mis gegaan. Neem a.u.b. contact op met
              <ClickableEmail /> en vermeldt het bestelnummer:
              {{ $route.params.code }}
            </b-notification>
          </template>
          <template v-if="order">
            <p>
              Wat leuk dat je het boek “Op!” hebt gekocht. Je ontvangt een
              downloadlink voor het boek in je e-mail.
            </p>
            <OrderSummary class="mb-5" :order="order" />
            <h4>Je hebt besteld:</h4>
            <CartItemsTable disabled :active-order="order" />
          </template>
        </div>
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
<style>
table {
  background-color: transparent !important;
}
</style>
