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
        <!-- Gifts slot -->
        <template #aboveCheckup>
          <GiftSelector
            :vendure="$vendure"
            :emitter="$emitter"
            :store="$store"
          />
        </template>

        <template #orderSummaryFooter>
          <h5>{{ $l('order-summary.payments') }}</h5>
          <img src="/img/payments.png" :alt="$l('order-summary.payments')" />
        </template>
      </CheckoutSteps>
    </template>
  </DefaultLayout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/components/CheckoutSteps';
import GiftSelector from 'pinelab-storefront/lib/components/GiftSelector';

export default {
  components: {
    CheckoutSteps,
    GiftSelector,
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
