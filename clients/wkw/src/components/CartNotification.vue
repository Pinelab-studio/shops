<template>
  <h5 v-if="hasCouponApplied" class="has-text-danger">
    We doen 1 zak
    <a href="/product/wormenmix-voor-bodemverbetering/"> Wormenmix </a> en 1 zak
    <a href="/product/lavameel-frankys-flora/"> Lavameel </a>
    bij je bestelling, voor elke 40 zakken
    <a href="/product/wormenmest/"> wormenmest! </a>
    <br />
  </h5>
</template>
<script>
export default {
  computed: {
    hasCouponApplied() {
      return this.$store?.activeOrder?.couponCodes?.find(
        (coupon) => coupon === 'inismoestuin'
      );
    },
  },
};
</script>
