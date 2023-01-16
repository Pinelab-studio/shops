<template>
  <DefaultLayout>
    <!-- PRODUCT CARD -->
    <template #content>
      <section id="highlighted">
        <div class="columns">
          <div class="column">
            <HighlightCard
              :title="$context.featuredProducts[0]?.name"
              :image="$context.featuredProducts[0]?.featuredAsset?.thumbnail"
              :slug="$context.featuredProducts[0]?.url"
              :price="$context.featuredProducts[0]?.lowestPrice"
            />
          </div>
          <div class="column is-4">
            <div class="columns is-mobile is-multiline">
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard
                  :title="$context.featuredProducts[1]?.name"
                  :image="
                    $context.featuredProducts[1]?.featuredAsset?.thumbnail
                  "
                  :slug="$context.featuredProducts[1]?.url"
                  :price="$context.featuredProducts[1]?.lowestPrice"
                />
              </div>
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard
                  :title="$context.featuredProducts[2]?.name"
                  :image="
                    $context.featuredProducts[2]?.featuredAsset?.thumbnail
                  "
                  :slug="$context.featuredProducts[2]?.url"
                  :price="$context.featuredProducts[2]?.lowestPrice"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="popular-categories">
        <h4 class="title has-text-weight-bold is-5 pt-5">
          {{ $l('common.popular-categories') }}
        </h4>
        <div class="columns is-multiline is-mobile">
          <template v-for="collection in $context.popularCollections">
            <div class="column is-6-mobile">
              <CategoryCard
                :title="collection.name"
                :image="collection.featuredAsset.thumbnail"
                :slug="collection.url"
              />
            </div>
          </template>
        </div>
      </section>
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

    <template #fullwidth>
      <div class="columns is-centered is-vcentered content">
        <div class="column p-4">
          <div class="has-text-white" v-html="$context.homeContent.intro"></div>
        </div>
        <div class="column p-4">
          <YoutubeEmbedLite
            id="youtubeEmbed"
            vid="cLblUjpFdfU"
            thumb-quality="hq"
            :params="{ start: 0 }"
            :aspect="0.4"
          />
        </div>
      </div>
    </template>

    <template #content2>
      <h4 class="title has-text-weight-bold is-5 pt-5">Blog</h4>
      <BlogCarousel :blogs="$context.blogs" />
    </template>
  </DefaultLayout>
</template>
<script>
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import BlogCarousel from '@/components/BlogCarousel.vue';
import HighlightCard from '@/components/HighlightCard.vue';
import YoutubeEmbedLite from '@miyaoka/vue-youtube-embed-lite';
export default {
  components: {
    ProductCard,
    CategoryCard,
    BlogCarousel,
    HighlightCard,
    YoutubeEmbedLite,
  },
};
</script>
<style>
iframe {
  min-height: 200px;
}

.content h3 {
  color: white;
}

#youtubeEmbed {
  position: relative;
  z-index: 1;
}
</style>
