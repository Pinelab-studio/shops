<template>
  <Layout>
    <CheckoutSteps
      class="checkout-steps"
      :vendure="$vendure"
      :emitter="$emitter"
      :store="$store"
      :available-countries="$context.availableCountries"
      :paymentMethods="['mollie']"
    />
  </Layout>
</template>
<script>
import CheckoutSteps from 'pinelab-storefront/lib/components/CheckoutSteps';

export default {
  components: {
    CheckoutSteps,
  },
};
</script>
