<template>
  <Layout>
    <template #hero>
      <section
        class="hero is-primary is-fullheight-with-navbar hero-background"
        :style="`background-image: url(${getDefaultImage(
          $context.home.hero_image.id
        )})`"
      >
        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              {{ $context.home.hero_title }}
            </h1>
            <p class="subtitle">
              {{ $context.home.hero_subtitle }}
            </p>
          </div>
        </div>
      </section>
    </template>

    <template #content>
      <section id="bio">
        <h2 class="title">{{ $context.home.intro_title }}</h2>
        <div v-html="$context.home.intro_text"></div>
        <br />
        <g-link class="button mr-4 mb-4" :to="$context.home.button1_link">
          {{ $context.home.button1_text }}
        </g-link>
        <g-link class="button mr-4 mb-4" :to="$context.home.button2_link">
          {{ $context.home.button2_text }}
        </g-link>
        <hr />
      </section>

      <section id="featured-products">
        <h2 class="title">Latest Products</h2>
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-mobile mb-4"
            v-for="product of $context.featuredProducts.slice(0, 4)"
            :key="product.slug"
          >
            <ProductCard
              :product="product"
              buy-label="Add to cart"
              product-url-prefix="/shop/"
            />
          </div>
        </div>
        <a href="/shop/">More Ben de Boef items ></a>
        <hr />
      </section>

      <section id="news">
        <h2 class="title">News</h2>
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-12-mobile is-3-desktop is-6-tablet mb-4"
            v-for="news of $context.news"
            :key="news.id"
          >
            <PopupImage
              :small="getSquareImage(news.image.id)"
              :alt="news.image.title"
              :large="getDefaultImage(news.image.id)"
              class="mb-4"
            />
            <h4>{{ news.title }}</h4>
            <div v-html="news.text"></div>
          </div>
        </div>
        <hr />
      </section>

      <!--      <b-modal v-model="showImageModal">
              <p class="image">
                <img :src="getPreview(asset)" />
              </p>
            </b-modal>-->
    </template>
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
    await hydrate(this.$context.featuredProducts, this.$vendure);
    await this.$vendure.getActiveOrder();
  },
};
</script>
<style>
.hero-background {
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;
}
</style>
