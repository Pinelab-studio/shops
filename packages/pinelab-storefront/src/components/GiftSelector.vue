<template>
  <div v-if="eligibleGifts?.length > 0" class="bordered p-5 mb-5 is-relative">
    <h5>{{ $l('checkup.gift-title') }}</h5>
    {{ $l('checkup.gift-message') }}
    <br />
    <br />

    <b-field v-for="gift of eligibleGifts" :key="gift.id">
      <b-radio
        v-model="selectedGiftId"
        :native-value="gift.id"
        @input="onGiftSelected"
      >
        <img :src="gift.product.featuredAsset?.thumbnail" style="width: 30px" />
        {{ gift.product.name }} ({{ $l('checkup.gift-worth') }}
        {{ gift.priceWithTax | euro }})
      </b-radio>
    </b-field>

    <b-loading
      :is-full-page="false"
      v-model="loadingGiftSelection"
      :can-cancel="true"
    ></b-loading>
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
    eligibleGifts: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      selectedGiftId: undefined,
      loadingGiftSelection: false,
    };
  },
  methods: {
    async onGiftSelected() {
      this.loadingGiftSelection = true;
      try {
        if (this.selectedGiftId) {
          await this.vendure.addGiftToOrder(this.selectedGiftId);
        }
      } catch (e) {
        this.emitter.emit('error', e);
      } finally {
        this.loadingGiftSelection = false;
      }
    },
  },
};
</script>
<style>
.bordered {
  border: 1px solid lightgray;
  border-radius: 4px;
}
</style>
