<template>
  <Layout>
    <CheckoutSteps
      class="checkout-steps"
      :vendure="$vendure"
      :emitter="$emitter"
      :store="$store"
      :available-countries="$context.availableCountries"
      :paymentMethods="['mollie', 'coinbase']"
    >
      <template #mollie>
        <span class="payment-methods">
          <span>Betalen via Mollie</span>
          <img src="/img/payment/ideal.svg" alt="ideal" />
          <img src="/img/payment/maestro.svg" alt="maestro" />
          <img src="/img/payment/mastercard.svg" alt="mastercard" />
          <img src="/img/payment/visa.svg" alt="visa" />
          <img src="/img/payment/sofort.svg" alt="sofort" />
          <img src="/img/payment/bancontact.svg" alt="bancontact" />
        </span>
      </template>
      <template #coinbase>
        <span class="payment-methods">
          <span>Betalen via Coinbase</span>
          <img src="/img/payment/bitcoin.png" alt="bitcoin" />
          <img src="/img/payment/bitcoincash.svg" alt="bitcoincash" />
          <img src="/img/payment/dai.svg" alt="dai" />
          <img src="/img/payment/dogecoin.png" alt="dogecoin" />
          <img src="/img/payment/ethereum.png" alt="ethereum" />
          <img src="/img/payment/litecoin.png" alt="litecoin" />
        </span>
      </template>
    </CheckoutSteps>
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
<style></style>
