<template>
  <DefaultLayout #content>
    <br />
    <h1 class="title mb-0">
      {{ $context.collection.name }}
    </h1>
    <ReadMoreDescription
      :description="$context.collection.description"
      :max-length="60"
      :collapse="3"
    />
    <br />
    <section v-if="$context.childCollections" id="sub-categories">
      <h2 class="title is-4">{{ $l('common.popular-categories') }}</h2>
      <div class="columns is-multiline is-mobile">
        <div
          class="column is-6-mobile"
          :class="getColumnWidth()"
          v-for="childCollection of $context.childCollections"
        >
          <CategoryCard
            :title="childCollection.name"
            :slug="childCollection.url"
            :image="childCollection.featuredAsset?.thumbnail"
          />
        </div>
      </div>
      <br />
      <br />
    </section>

    <section id="products">
      <h2 class="title is-4">{{ $l('common.products') }}</h2>
      <div class="columns is-multiline is-mobile" v-if="$context.products">
        <div
          class="column is-6-mobile is-4-tablet is-one-fifth-desktop"
          v-for="product of $context.products"
        >
          <ProductCard
            :title="product.name"
            :image="product.featuredAsset.thumbnail"
            :slug="product.url"
            :price="product.lowestPrice"
          />
        </div>
      </div>
      <br />
      <br />
    </section>

    <section id="description">
      <span class="anchor" id="full-description"></span>
      <div class="columns">
        <div class="column">
          <div class="content" v-html="$context.collection.description"></div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
<script>
import ReadMoreDescription from '../components/ReadMoreDescription';
import ProductCard from '../components/ProductCard.vue';
import { getMetaInfo, hydrate } from 'pinelab-storefront';
import CategoryCard from '../components/CategoryCard';

export default {
  components: {
    CategoryCard,
    ReadMoreDescription,
    ProductCard,
  },
  data() {
    return {};
  },
  async mounted() {
    await hydrate(this.$context.products, this.$vendure);
  },
  methods: {
    /**
     * Get column widht class based on the nr of childcollections
     */
    getColumnWidth() {
      switch (this.$context.childCollections?.length) {
        case 2:
          return 'is-6';
        case 3:
          return 'is-4';
        case 4:
          return 'is-3-desktop';
        case 5:
          return 'is-one-fifth-tablet';
        case 6:
          return 'is-2-tablet';
        case 7:
          return 'is-3-tablet';
        case 8:
          return 'is-3-tablet';
        case 9:
          return 'is-3-tablet';
        default:
          return '';
      }
    },
  },
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.collection, url);
  },
};
</script>
<style scoped></style>
