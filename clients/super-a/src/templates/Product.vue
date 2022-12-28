<template>
  <Layout #content>
    <br />
    <h1>{{ $context.product.name }}</h1>
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column">
        <h5 class="has-text-grey is-size-5">{{ variant.name }}</h5>
        <h5 class="is-size-5 mb-4">{{ variant.priceWithTax | euro }}</h5>
        <VariantSelector
          :product="$context.product"
          :variant="variant"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <p v-if="limit" class="has-text-danger mb-4">
          Limited item! You can only buy {{ limit }}
        </p>
        <b-button
          class="is-primary is-fullwidth"
          :loading="isLoading"
          :disabled="isSoldOut"
          v-on:click="buy()"
          >{{ isSoldOut ? 'Sold out' : 'Buy' }}
        </b-button>
        <br />
        <div v-html="$context.product.description"></div>
      </div>
    </div>
  </Layout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import { buy, getMetaInfo, hydrate, isOutOfStock } from 'pinelab-storefront';

export default {
  components: {
    ProductImages,
    VariantSelector,
  },
  computed: {
    limit() {
      return this.variant.customFields?.maxPerOrder;
    },
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
  metaInfo() {
    return getMetaInfo(this.$context.product);
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
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
