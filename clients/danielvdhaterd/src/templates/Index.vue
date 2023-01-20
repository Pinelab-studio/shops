<template>
  <Layout>
    <div class="bio">
      <h3>Over Daniël van de Haterd</h3>
      <p>
        Je loopt geregeld zijn street art tegen het lijf rondom Amersfoort.
        Daniël van de Haterd werkt al ruim 15 jaar als graffiti kunstenaar...
        <g-link to="/bio/">Lees meer</g-link>
      </p>
    </div>
    <div class="columns is-multiline is-mobile">
      <template v-for="product of $context.products">
        <div class="column is-half-mobile is-3-desktop mb-4">
          <ProductCard
            :product="product"
            buy-label="In winkelmand"
            product-url-prefix="product"
            soldoutLabel="Uitverkocht"
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
