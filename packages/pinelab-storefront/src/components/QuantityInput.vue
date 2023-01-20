<template>
  <b-numberinput
    size="is-small"
    v-on:input="updateQuantity()"
    v-model="newValue"
    :loading="loading"
  >
  </b-numberinput>
</template>
<script>
import { debounce } from 'debounce';

export default {
  props: {
    value: { required: true },
    lineId: { required: true },
  },
  data() {
    return {
      newValue: this.value,
      loading: false,
    };
  },
  created() {
    this.updateQuantity = debounce(this.updateQuantity, 500);
  },
  methods: {
    async updateQuantity() {
      this.loading = true;
      try {
        await this.$vendure.adjustOrderLine(this.lineId, this.newValue);
      } catch (e) {
        console.error(e);
        this.$emitter.emit('error', e);
        await this.$vendure.getActiveOrder();
      } finally {
        this.loading = false;
        this.newValue = this.value;
      }
    },
  },
};
</script>
