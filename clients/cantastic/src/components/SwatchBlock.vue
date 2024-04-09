<template>
  <div class="box mb-2" :style="`background-color: ${bgColor};`">
    <div class="columns is-mobile">
      <div
        class="column is-size-7 pl-4 pr-0 pt-1 pb-0"
        :style="`color: ${textColor};`"
        :class="{ 'disabled-swatch': isOutOfStock }"
      >
        {{ variant.options[0].name }}
      </div>
      <div class="column p-0 swatch">
        <b-numberinput
          size="is-small"
          v-on:input="buy()"
          v-model="displayQuantity"
          :loading="isLoading"
          tabindex="1"
          :min="0"
          :max="999"
          :disabled="isOutOfStock"
        >
        </b-numberinput>
      </div>
    </div>
  </div>
</template>
<script>
import { buy } from 'pinelab-storefront';
import debounce from 'debounce';
import { trackViewItem, trackAddToCart } from '../gtm-util.js';

export default {
  props: ['variant', 'bgColor', 'textColor'],
  data() {
    return {
      isLoading: false,
      displayQuantity: 0,
    };
  },
  computed: {
    isOutOfStock() {
      return this.variant.stockLevel === 'OUT_OF_STOCK';
    },
    orderLine() {
      return this.$store?.activeOrder?.lines.find(
        (line) => line.productVariant.id === this.variant.id
      );
    },
  },
  watch: {
    orderLine(order) {
      // Show current amount of cart in swatch blocks
      this.displayQuantity = this.orderLine?.quantity || 0;
    },
  },
  methods: {
    async buy() {
      try {
        if (!this.orderLine) {
          // Buy because no existing orderLine
          await buy(
            this.variant,
            {
              vendure: this.$vendure,
              emitter: this.$emitter,
            },
            this.displayQuantity
          );
        } else {
          // Adjust existing orderline
          const quantityAdded = this.displayQuantity - this.orderLine.quantity;
          await this.$vendure.adjustOrderLine(
            this.orderLine.id,
            this.displayQuantity
          );
          this.$emitter.emit('productAdded', {
            variantId: this.variant.id,
            quantity: quantityAdded,
          });
        }
      } catch (e) {
        console.error(e);
        this.$emitter.emit('error', e);
      } finally {
        this.isLoading = false;
      }
      if (this.$gtm.enabled()) {
        trackAddToCart(
          this.variant.name,
          this.variant.sku,
          this.variant.priceWithTax,
          this.quantity,
          'EUR'
        );
      }
    },
  },
  created() {
    this.buy = debounce(this.buy, 500);
  },
  mounted() {
    if (this.$gtm.enabled()) {
      trackViewItem(
        this.variant.name,
        this.variant.sku,
        this.variant.priceWithTax,
        'EUR'
      );
    }
  },
};
</script>
<style>
.disabled-swatch {
  text-decoration: line-through;
  opacity: 0.5;
}

.swatch .button {
  background-color: var(--loop-soft-dark);
}

.swatch .button:active,
.swatch .button:hover {
  background-color: var(--loop-soft-dark);
  opacity: 0.9;
}

.swatch .button[disabled] {
  background-color: var(--loop-soft-dark);
}
</style>
