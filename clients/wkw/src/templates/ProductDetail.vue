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
                <b-button
                  label="Review schrijven"
                  type="is-primary is-pulled-right"
                  @click="isReviewComponentModalActive = true"
                />
                <b-modal
                  v-model="isReviewComponentModalActive"
                  has-modal-card
                  trap-focus
                  aria-role="dialog"
                  aria-label="Review Modal"
                  close-button-aria-label="Close"
                  aria-modal
                >
                  <template #default="props">
                    <modal-form
                      v-bind="formProps"
                      @close="props.close"
                    ></modal-form>
                  </template>
                </b-modal>
              </p>

              <b-rate
                v-model="rate"
                class="my-3"
                rate="4"
                disabled="true"
                custom-text=""
              ></b-rate>

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

        <section id="popular-products">
          <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">
            Populaire producten
          </h4>
          <div class="columns is-multiline is-mobile">
            <template v-for="index in 5">
              <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
                <ProductCard
                  title="Wormenkwekerij stickers"
                  image="https://storage.googleapis.com/wassets/preview/36/ebooks__preview.jpeg"
                  slug="wormenkwekerij-stickers"
                  price="14900"
                />
              </div>
            </template>
          </div>
        </section>

        <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">
          Reviews
        </h4>
        <div class="tile is-parent">
          <article class="tile is-child notification is-grey">
            <Reviews />
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
import ProductCard from '@/components/ProductCard.vue';
import Reviews from '@/components/Reviews';
import { buy, hydrate, isOutOfStock } from 'pinelab-storefront';
import ModalForm from '@/components/ModalForm';

export default {
  components: {
    ProductImages,
    VariantSelector,
    ReadMoreDescription,
    ModalForm,
    Reviews,
    ProductCard,
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
      //  CART DATA
      selectedVariant: undefined,
      isLoading: false,
      quantity: 1,

      //  RATING STARS DATA
      rate: 4,
      maxs: 5,

      // REVIEW MODAL DATA
      isReviewComponentModalActive: false,
      formProps: {
        email: 'evan@you.com',
        password: 'testing',
      },
    };
  },
  async mounted() {
    console.log(this.$context.product);
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

.columns {
  margin-left: 0;
  margin-right: 0;
}
</style>
