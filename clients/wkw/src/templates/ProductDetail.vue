<template>
  <DefaultLayout #content>
    <br />
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child">
              <ProductImages :product="$context.product" :variant="variant" />
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child">
              <p class="title has-text-black mb-0">
                {{ $context.product.name }}
              </p>
              <b-rate
                class="my-3"
                v-model="rate"
                icon-pack="mdi"
                icon="star"
                :max="5"
                :show-score="false"
                :show-text="false"
                :texts="[]"
                custom-text="reviews"
                :rtl="false"
                :spaced="false"
                :disabled="true"
              >
              </b-rate>
              <p class="subtitle has-text-black">
                {{ variant.priceWithTax | euro }}
              </p>
              <ReadMoreDescription
                :description="$context.product.description"
                :max-length="60"
                :collapse="3"
              />
            </article>
            <article class="tile is-child">
              <VariantSelector
                :product="$context.product"
                :variant="variant"
                v-on:select="selectedVariant = $event"
              />
              <br />
              <b-field grouped>
                <b-numberinput
                  v-model="quantity"
                  min="1"
                  max="999"
                  placeholder="1"
                  :disabled="isSoldOut"
                >
                </b-numberinput>
                <b-button
                  icon-left="basket-plus"
                  class="is-primary is-fullwidth"
                  :loading="isLoading"
                  :disabled="isSoldOut"
                  aria-label="In winkelmand"
                  v-on:click="buy()"
                  >{{ isSoldOut ? 'Uitverkocht' : 'In winkelmand' }}
                </b-button>
              </b-field>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child">
            <p
              id="full-description"
              class="content"
              v-html="$context.product.description"
            ></p>
          </article>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import ReadMoreDescription from '@/components/ReadMoreDescription';
import { buy, getMetaInfo, hydrate, isOutOfStock } from 'pinelab-storefront';

export default {
  components: { ProductImages, VariantSelector, ReadMoreDescription },
  computed: {
    variant() {
      console.log(this.$context);
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
      rate: 4,
    };
  },
  async mounted() {
    await hydrate(this.$context.product, this.$vendure);
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
    },
  },
};
</script>
<style>
.tile {
  height: min-content;
}

.carousel-item {
  object-fit: cover;
  height: 500px;
}
</style>
