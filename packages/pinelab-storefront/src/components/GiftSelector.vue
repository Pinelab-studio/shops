<template>
  <div v-if="eligibleGifts">
    <h5>{{ $l('checkup.gift-title') }}</h5>
    {{ $l('checkup.gift-message') }}

    <b-field v-for="gift of eligibleGifts" :key="gift.id">
      <b-radio v-model="selectedGift" size="is-large" :native-value="gift">
        <small>{{ gift.name }}</small>
      </b-radio>
    </b-field>
  </div>
</template>
<script>
import { VendureClient } from '../vendure/vendure.client';
import { Store } from '../vendure/types';

export default {
  props: {
    vendure: {
      type: VendureClient,
      required: true,
    },
    emitter: {
      type: Object,
      required: true,
    },
    store: {
      type: [Store, Object],
      required: true,
    },
  },
  computed: {
    activeOrder() {
      return this.store?.activeOrder || {};
    },
  },
  data() {
    return {
      eligibleGifts: undefined,
      selectedGift: undefined,
    };
  },
  async mounted() {
    this.eligibleGifts = await this.vendure.getEligibleGifts();
    console.log(this.eligibleGifts);
  },
};
</script>
