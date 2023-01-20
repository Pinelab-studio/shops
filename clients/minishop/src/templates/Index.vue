<template>
  <Layout>
    <h1 class="title has-text-centered">Minishop demo</h1>

    <br />
    <br />

    <div class="columns is-multiline is-mobile">
      <div
        class="column is-half-mobile is-one-quarter-tablet mb-4"
        v-for="product of $context.products"
        :key="product.slug"
      >
        <ProductCard
          :product="product"
          buy-label="Add to cart"
          product-url-prefix="product"
          soldoutLabel="Sold out"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront/lib/components/ProductCard';
import { hydrate } from 'pinelab-storefront';
import ProductFilter from 'pinelab-storefront/lib/components/ProductFilter';

export default {
  components: {
    ProductCard,
    ProductFilter,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
};
</script>
<style></style>
