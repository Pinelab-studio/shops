<template>
  <DefaultLayout #content>
    <h1 class="title">{{ $context.product.name }}</h1>
    <div class="columns">
      <div class="column">
        <ProductImages :product="$context.product" :variant="variant" />
      </div>
      <div class="column content">
        <h5
          v-if="$context.product.variants.length > 1"
          class="has-text-grey is-size-5"
        >
          {{ variant.name }}
        </h5>
        <h2 class="is-size-2 mb-4">{{ variant.priceWithTax | euro }}</h2>
        <VariantSelector
          v-if="$context.product.variants.length > 1"
          :product="$context.product"
          :variant="variant"
          v-on:select="selectedVariant = $event"
        />
        <br />
        <div class="columns">
          <div class="column is-5">
            <b-numberinput
              v-model="quantity"
              min="1"
              max="999"
              :disabled="isSoldOut"
            >
            </b-numberinput>
          </div>
          <div class="column is-7">
            <b-button
              icon-left="basket-plus"
              class="is-primary is-fullwidth"
              :loading="isLoading"
              :disabled="isSoldOut"
              aria-label="In winkelmand"
              v-on:click="buy()"
              >{{ isSoldOut ? 'Uitverkocht' : 'In winkelmand' }}
            </b-button>
          </div>
        </div>
        <br />
        <ReadMoreDescription
          :description="$context.product.description"
          :max-length="60"
          :collapse="3"
        />
        <br />
        <template v-for="usp of $context.usps">
          <div class="is-flex">
            <b-icon
              icon="crown-circle"
              size="is-medium"
              type="is-info"
              class="is-vcentered"
            ></b-icon>
            <div v-html="usp" class="pl-2 mb-4"></div>
          </div>
        </template>
      </div>
    </div>
    <h2 class="is-size-3">Productbeschrijving</h2>
    <div
      id="full-description"
      class="content"
      v-html="$context.product.description"
    ></div>
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import ReadMoreDescription from '../components/ReadMoreDescription';
import { buy, hydrate, isOutOfStock } from 'pinelab-storefront';
import { getMetaInfo } from 'pinelab-storefront';
import { trackViewItem, trackAddToCart } from '../gtm-util.js';

export default {
  components: {
    ProductImages,
    VariantSelector,
    ReadMoreDescription,
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
      quantity: 1,
    };
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
    if (this.$gtm.enabled()) {
      trackViewItem(
        this.variant.name,
        this.variant.sku,
        this.variant.priceWithTax,
        'EUR'
      );
    }
  },
  methods: {
    async buy() {
      this.isLoading = true;
      await buy(
        this.variant,
        {
          vendure: this.$vendure,
          emitter: this.$emitter,
        },
        this.quantity
      );
      this.isLoading = false;
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
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.product, url);
  },
};
</script>
<style>
.is-clickable.image {
  cursor: zoom-in !important;
}

.carousel-arrow .icon {
  border: 1px solid #333232;
  opacity: 1;
}
</style>
