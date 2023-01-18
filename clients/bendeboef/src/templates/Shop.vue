<template>
  <Layout>
    <template #content>
      <ProductFilter
        :collections="$context.collections"
        no-collection-url="/shop/"
        :selected-collection="$context.collection"
      />

      <br />
      <div v-if="$context.collection">
        <h1 class="is-size-1">{{ $context.collection.name }}</h1>
        <p
          v-if="$context.collection.description"
          v-html="$context.collection.description"
        ></p>
      </div>
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
            product-url-prefix="/shop/"
          />
        </div>
      </div>
    </template>
  </Layout>
</template>
<script>
import ProductFilter from 'pinelab-storefront/lib/components/ProductFilter';
import ProductCard from 'pinelab-storefront/lib/components/ProductCard';
import { hydrate } from 'pinelab-storefront';

export default {
  components: {
    ProductFilter,
    ProductCard,
  },
  async mounted() {
    await hydrate(this.$context.products, this.$vendure);
  },
};
</script>
