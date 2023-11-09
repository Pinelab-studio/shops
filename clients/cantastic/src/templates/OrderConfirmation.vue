<template>
  <DefaultLayout>
    <template #content>
      <div>
        <h3>Bedankt voor je bestelling!</h3>
        <div class="columns">
          <div class="column">
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
                Er is helaas iets mis gegaan. Neem contact op met ons en vermeld
                bestelnummer {{ $route.params.code }}
              </b-notification>
            </template>
            <template v-if="order">
              <OrderSummary class="mb-5" :order="order" />
              <h4>Producten</h4>
              <CartItemsTable disabled :active-order="order" />
            </template>
          </div>
          <div class="column is-narrow">
            <img src="/img/spray.gif" alt="Spray along" />
          </div>
        </div>
      </div>
    </template>
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
      // Push purchase event to GTM
      if (this.$gtm.enabled()) {
        try {
          const items = this.order.lines.map((line) => ({
            item_id: line.productVariant.sku,
            item_name: line.productVariant.name,
            quantity: line.quantity,
            price: line.productVariant.priceWithTax / 100,
          }));
          window?.dataLayer?.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: this.order.id,
              value: (this.order.totalWithTax / 100).toFixed(2),
              currency: 'EUR',
              items,
            },
          });
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      this.failed = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>
