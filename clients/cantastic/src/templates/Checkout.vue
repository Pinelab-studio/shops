<template>
  <DefaultLayout>
    <template #content>
      <CheckoutSteps
        class="checkout-steps"
        :vendure="$vendure"
        :emitter="$emitter"
        :store="$store"
        :available-countries="$context.availableCountries"
      >
        <template #orderSummaryFooter>
          <h5>Betaalmogelijkheden</h5>
          <img src="/img/payments.png" alt="Betaalmogelijkheden" />
        </template>
      </CheckoutSteps>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/components/CheckoutSteps';
import { trackBeginCheckout } from '../gtm-util.js';

export default {
  components: {
    CheckoutSteps,
  },
  async mounted() {
    if (this.$gtm.enabled()) {
      await this.$vendure.getActiveOrder();
      trackBeginCheckout(this.$store?.activeOrder, 'EUR');
    }
  },
};
</script>
<style>
.scrollable-product-overview {
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
