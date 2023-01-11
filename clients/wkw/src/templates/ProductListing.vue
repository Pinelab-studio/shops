<template>
  <DefaultLayout #content>
    <br />
    {{ $contet.collection.name }}
  </DefaultLayout>
</template>
<script>
import ProductImages from 'pinelab-storefront/lib/components/ProductImages';
import VariantSelector from 'pinelab-storefront/lib/components/VariantSelector';
import ReadMoreDescription from '@/components/ReadMoreDescription';
import ProductCard from '@/components/ProductCard.vue';
import Reviews from '@/components/Reviews';
import { buy, getMetaInfo, hydrate, isOutOfStock } from 'pinelab-storefront';
import WriteReviewButton from '../components/WriteReviewButton';

export default {
  components: {
    WriteReviewButton,
    ProductImages,
    VariantSelector,
    ReadMoreDescription,
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
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.product, url);
  },
};
</script>
<style scoped>
.tile {
  height: min-content;
}

.columns {
  margin-left: 0;
  margin-right: 0;
}
</style>
