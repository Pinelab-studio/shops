<template>
  <div class="product-container mt-5">
    <g-link :to="`/product/${product.slug}/`" style="margin-bottom: -20px">
      <div class="is-relative">
        <b-image
          :src="maybeThumbnail(product.featuredAsset)"
          :alt="product.name"
          ratio="1by1"
          class="contain-image product-zoom-hover"
        />
        <div
          v-if="bottomBanner"
          class="bottom-banner has-background-danger has-text-white p-2 rounded"
        >
          {{ bottomBanner.name }}
        </div>
        <div
          v-if="topBanner"
          class="top-banner has-background-info has-text-white is-size-7"
        >
          {{ topBanner.name }}
        </div>
      </div>
      <p class="is-size-7">{{ product.category || '&nbsp;' }}</p>
      <h6>{{ product.name }}</h6>
    </g-link>
    <div class="buy-button has-text-right">
      <h5 class="is-inline-block pt-3 pr-2">
        <template v-if="product.soldOut"
          ><s>{{ product.lowestPrice | euro }}</s></template
        >
        <template v-else>{{ product.lowestPrice | euro }}</template>
      </h5>
      <template v-if="hasMultipleVariants">
        <b-button
          type="is-info"
          size="default"
          :disabled="product.soldOut"
          @click="$router.push(`/product/${product.slug}/`)"
          >Bekijken</b-button
        >
      </template>
      <template v-else>
        <!-- quantity -->
        <input
          type="number"
          min="0"
          max="999"
          :disabled="product.soldOut"
          v-model="quantity"
          v-on:keyup.enter="buy()"
          class="input mr-3 listing-quantity"
        />
        <b-button
          type="is-info"
          size="default"
          icon-right="basket-plus-outline"
          :loading="isLoading"
          :disabled="product.soldOut"
          @click="buy()"
        />
      </template>
    </div>
  </div>
</template>
<script>
import { buy } from 'pinelab-storefront';

export default {
  props: ['product'],
  data() {
    return {
      isLoading: false,
      hasMultipleVariants: this.product.variants.length > 1,
      quantity: 1,
    };
  },
  methods: {
    async buy() {
      try {
        this.isLoading = true;
        const variant = this.product.variants[0];
        await buy(
          variant,
          {
            vendure: this.$vendure,
            emitter: this.$emitter,
          },
          Number(this.quantity)
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    bottomBanner() {
      return this.product.facetValues.find((f) => f.facet.code === 'banner');
    },
    topBanner() {
      return this.product.facetValues.find(
        (f) => f.facet.code === 'banner-top'
      );
    },
  },
};
</script>
<style>
.product-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
}

.product-container a {
  color: unset;
}

.buy-button {
  margin-top: auto;
  white-space: nowrap;
  overflow: visible;
}

.contain-image img {
  object-fit: contain;
}

.bottom-banner {
  position: absolute;
  /*top: 0;*/
  bottom: 0;
  max-width: 80%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  line-height: 1;
}

.top-banner {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
}

.product-zoom-hover img {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: transform 0.2s; /* Animation */
}

.product-zoom-hover img:hover,
.product-zoom-hover img:focus {
  transform: scale(1.05);
}

.listing-quantity {
  height: 38px;
  width: 44px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
