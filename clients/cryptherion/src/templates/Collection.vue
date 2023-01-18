<template>
  <Layout>
    <section id="category-intro" class="mb-6">
      <h1 class="has-text-centered pb-2">{{ $context.collection.name }}</h1>
      <img
        v-if="$context.collection.featuredAsset"
        class="collection-banner"
        :src="maybe($context.collection.featuredAsset, 'preview')"
        :alt="`Categorie ${$context.collection.name}`"
      />
      <template v-if="$context.collection.description">
        <div
          :class="{ collapsed: collapsed }"
          v-html="$context.collection.description"
        ></div>
        <div class="has-text-right">
          <a @click="collapsed = !collapsed">
            <b-icon
              pack="mdi"
              :icon="collapsed ? 'chevron-down' : 'chevron-up'"
            >
            </b-icon>
          </a>
        </div>
      </template>
    </section>

    <div v-if="$context.parentCollection">
      <ProductFilter
        :collections="$context.siblingCollections"
        :no-collection-url="`/categorie/${$context.parentCollection.slug}`"
        collection-url-prefix="/categorie/"
        :selected-collection="$context.collection"
      />
    </div>
    <div v-else>
      <ProductFilter
        :collections="$context.childCollections"
        collection-url-prefix="/categorie/"
        :no-collection-url="`/categorie/`"
      />
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
          buy-label="In winkelmand"
          product-url-prefix="product"
          soldoutLabel="Uitverkocht"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront/lib/components/ProductCard';
import ProductFilter from 'pinelab-storefront/lib/components/ProductFilter';
import { getMetaInfo, hydrate } from 'pinelab-storefront';

export default {
  components: {
    ProductCard,
    ProductFilter,
  },
  data() {
    return {
      collapsed: true,
    };
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.products, this.$vendure);
  },
  methods: {
    maybe(obj, property) {
      return obj?.[property];
    },
  },
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.collection, url);
  },
};
</script>
<style>
.collection-banner {
  max-height: 200px;
  width: 100%;
  object-fit: cover;
}

.collapsed {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
