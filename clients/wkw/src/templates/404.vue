<template>
  <DefaultLayout>
    <template #content>
      <h1 class="title is-1">404 - Not found</h1>

      <div class="has-text-centered">
        <video width="320" height="240" autoplay muted loop>
          <source src="404.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section id="popular-products">
        <h4 class="title has-text-weight-bold is-5 pt-5">
          {{ $l('common.popular-products') }}
        </h4>
        <div class="columns is-multiline is-mobile">
          <template v-for="product in $context.popularProducts">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <ProductCard
                :title="product.name"
                :image="product.featuredAsset.thumbnail"
                :slug="product.url"
                :price="product.lowestPrice"
              />
            </div>
          </template>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
  components: {
    ProductCard,
  },
};
</script>
