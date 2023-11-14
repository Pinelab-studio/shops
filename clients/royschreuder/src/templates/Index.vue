<template>
  <Layout>
    <div class="bio">
      <h3>Roy Schreuder</h3>
    </div>
    <div class="columns is-multiline is-mobile">
      <template v-for="product of $context.products">
        <div class="column is-half-mobile is-3-desktop mb-4">
          <ProductCard
            :product="product"
            buy-label="Add to cart"
            product-url-prefix="product"
            soldoutLabel="Sold out"
          ></ProductCard>
        </div>
      </template>
    </div>
  </Layout>
</template>
<style>
.bio {
  margin-bottom: 50px;
}
</style>
<script>
import ProductCard from 'pinelab-storefront/lib/components/ProductCard';
import { hydrate } from 'pinelab-storefront';

export default {
  components: {
    ProductCard,
  },
  async mounted() {
    await hydrate(this.$context.products, this.$vendure);
  },
};
</script>
