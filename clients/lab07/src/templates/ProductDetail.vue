<template>
  <DefaultLayout>
    <b-button tag="a" href="/shop/"></b-button>
    <br />
    <br />
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column">
        <h1 class="title">{{ $context.product.name }}</h1>
        <h5 class="is-size-5 mb-4">{{ variant.priceWithTax | euro }}</h5>
        <VariantSelector
          :product="$context.product"
          :variant="variant"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <b-button
          class="is-primary is-fullwidth"
          :loading="isLoading"
          :disabled="isSoldOut"
          v-on:click="buy()"
          >{{ isSoldOut ? 'Uitverkocht' : 'In winkelmand' }}
        </b-button>
        <br />
        <div v-html="$context.product.description"></div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import { buy, hydrate, isOutOfStock, getMetaInfo } from 'pinelab-storefront';

export default {
  components: {
    ProductImages,
    VariantSelector,
  },
  computed: {
    variant() {
      return (
        this.selectedVariant ||
        this.$context?.product.variants.find((v) => !isOutOfStock(v)) ||
        this.$context?.product.variants[0]
      );
    },
    isSoldOut() {
      return isOutOfStock(this.variant);
    },
  },
  data() {
    return {
      selectedVariant: undefined,
      isLoading: false,
    };
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
  },
  metaInfo() {
    return getMetaInfo(this.$context.product);
  },
  methods: {
    async buy() {
      this.isLoading = true;
      await buy(this.variant, {
        vendure: this.$vendure,
        emitter: this.$emitter,
      });
      this.isLoading = false;
    },
  },
};
</script>
