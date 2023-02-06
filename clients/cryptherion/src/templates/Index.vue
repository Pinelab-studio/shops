<template>
  <Layout>
    <div class="mb-2 has-text-centered">
      <img
        src="/img/cryptherion-logo-black.svg"
        alt="Cryptherion logo"
        class="hero-logo"
      />
      <section id="usps" class="is-dark">
        <div class="content has-text-centered">
          <!--          <span class="line">
            <b-icon
              v-for="i of 5"
              :key="`star${i}`"
              icon="star-circle"
              size="is-small"
              type="is-warning"
            ></b-icon>
            <span class="mx-2"
              >Bekijk onze reviews op
              <a href="https://www.trustpilot.com/" target="_blank"
                >Trustpilot</a
              ></span
            >
          </span>-->

          <span class="line">
            <b-icon
              class="mx-2"
              icon="check-circle"
              size="is-small"
              type="is-success"
            >
            </b-icon>
            <span>Voor 14:00 besteld, dezelfde dag verzonden</span>
          </span>

          <!--          <span class="line">
            <b-icon
              class="mx-2"
              icon="phone"
              size="is-small"
              type="is-success"
            ></b-icon>
            <a :href="`tel:${$context.global.telefoon}`">{{
              $context.global.telefoon
            }}</a>
          </span>-->

          <span class="line">
            <b-icon
              class="mx-2"
              icon="email"
              size="is-small"
              type="is-success"
            ></b-icon>
            <a :href="`mailto:${$context.global.email}`">{{
              $context.global.email
            }}</a>
          </span>

          <!--          <span class="line">
            <b-icon
              class="mx-2"
              icon="check-circle"
              size="is-small"
              type="is-success"
            >
            </b-icon>
            <span class="mr-2">Betaal met Bitcoin</span>
          </span>-->
        </div>
      </section>
    </div>

    <section
      v-if="$context.featuredProduct"
      class="hero is-halfheight main-feature px-5 is-light-grey mb-2 py-4"
    >
      <div class="columns">
        <div class="column">
          <h1 class="title py-6">
            {{ $context.featuredProduct.name }}
          </h1>
          <div class="subtitle" v-html="$context.featuredText"></div>
          <g-link
            :to="`/product/${$context.featuredProduct.slug}`"
            class="is-primary is-fullwidth button is-large"
            style="padding: 30px"
          >
            <h2>
              {{ $context.featuredProduct.lowestPrice | euro }}
              <span class="icon is-large ml-4"
                ><i class="mdi mdi-alert-octagram"></i
              ></span>
            </h2>
          </g-link>
        </div>

        <div class="column has-text-centered">
          <img
            :src="maybe($context.featuredProduct.featuredAsset, 'preview')"
            :alt="$context.featuredProduct.name"
            id="featured-image"
          />
          <!--          <b-image
            :src="maybe($context.featuredProduct.featuredAsset, 'preview')"
            :alt="$context.featuredProduct.name"
            ratio="1by1"
            id="featured-image"
          />-->
        </div>
      </div>
    </section>

    <section
      class="py-4 category"
      v-for="collection of $context.collections"
      :key="collection.slug"
    >
      <g-link :to="`/categorie/${collection.slug}`">
        <h2>{{ collection.name }}</h2>
      </g-link>
      <div class="columns is-multiline is-mobile">
        <div
          class="column is-4-mobile is-2-tablet has-text-centered"
          v-for="childCollection of collection.children"
          :key="childCollection.slug"
        >
          <g-link :to="`/categorie/${childCollection.slug}`">
            <b-image
              :src="maybe(childCollection.featuredAsset, 'thumbnail')"
              :alt="childCollection.name"
              ratio="1by1"
            ></b-image>
            {{ childCollection.name }}
          </g-link>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
import ProductCard from 'pinelab-storefront/lib/components/ProductCard';
import { hydrate } from 'pinelab-storefront';

export default {
  components: {
    ProductCard,
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
};
</script>
<style>
#featured-image {
  object-fit: contain;
  width: auto;
  height: 100%;
  max-width: 300px;
  max-height: 500px;
}
</style>
