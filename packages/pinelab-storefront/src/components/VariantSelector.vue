<template>
  <div v-if="Object.values(availableOptions).length > 0">
    <div v-for="(group, groupId) in availableOptions">
      <h3 class="has-text-weight-bold mb-2">{{ group.name }}</h3>

      <b-button
        v-for="(optionName, optionId) in group.options"
        :key="optionId"
        :aria-label="`${group.name} ${optionName}`"
        class="mr-2 mb-2"
        :class="{ 'is-primary': selectedOptions[groupId] === optionId }"
        @click="select(groupId, optionId)"
      >
        {{ optionName }}
      </b-button>
    </div>
  </div>
</template>
<script>
import {
  findVariant,
  getAvailableOptions,
  getOptionsFromVariant,
} from '../util/variant.util';

export default {
  props: {
    product: { required: true },
    variant: { required: true },
  },
  data() {
    return {
      selectedVariant: undefined,
      selectedOptions: {},
      availableOptions: {},
    };
  },
  watch: {
    product(neVal, oldVal) {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.selectedVariant = this.variant;
      this.selectedOptions = getOptionsFromVariant(this.selectedVariant);
      this.availableOptions = getAvailableOptions(this.product.variants);
    },
    select(groupId, optionId) {
      this.selectedOptions[groupId] = optionId;
      const variant = findVariant(this.selectedOptions, this.product.variants);
      if (variant) {
        this.$emit('select', variant);
      } else {
        this.$emit('select', {
          ...this.variant,
          stockLevel: 'OUT_OF_STOCK',
        });
      }
    },
  },
};
</script>
