<template>
  <DefaultLayout>
    <template #content>
      <div>
        <h3 class="is-3 title">{{ $l('order-confirmation.thanks') }}</h3>
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
                {{ $l('order-confirmation.error') }}
                Er is helaas iets mis gegaan. Neem contact op met ons en vermeld
                bestelnummer {{ $route.params.code }}
              </b-notification>
            </template>
            <template v-if="order">
              <OrderSummary class="mb-5" :order="order" />
              <h4 class="is-4 title">{{ $l('common.products') }}</h4>
              <CartItemsTable disabled :active-order="order" />
            </template>
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
  methods: {
    getPath(lang) {
      if (lang === 'nl') {
        return `/order/${this.$route.params.code}/`;
      } else {
        return `/en/order/${this.$route.params.code}/`;
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      this.order = await getOrderByCode(this.$vendure, this.$route.params.code);
      const path = this.getPath('en');
      if (
        this.order?.shippingAddress?.country?.toLowerCase() !== 'nederland' &&
        this.$route.path !== path
      ) {
        // We will be redirected to EN order page if we arent there yet
        await this.$router.push(path).catch(() => {});
      } else {
        // Means we are on the page we should be, so we can push purchase event
        const items = this.order.lines.map((line) => ({
          item_id: line.productVariant.sku,
          item_name: line.productVariant.name,
          quantity: line.quantity,
          price: line.productVariant.priceWithTax / 100,
        }));
        const purchase = {
          transaction_id: this.order.id,
          value: this.order.totalWithTax / 100,
          currency: 'EUR',
          items: items,
        };
        this.$gtag.event('conversion', {
          send_to: 'AW-869905982/nhm9CP_w_ocDEL7s5p4D',
          value: purchase.value,
          currency: purchase.currency,
          transaction_id: purchase.transaction_id,
        });
        console.log(purchase);
        this.$gtag.purchase(purchase);
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
