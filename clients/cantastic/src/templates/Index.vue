<template>
  <DefaultLayout>
    <template #content>
      <section id="highlighted">
        <div class="columns">
          <div class="column is-7">
            <HighlightCard
              v-if="$context.highlights[0]"
              :highlight="$context.highlights[0]"
            />
          </div>
          <div class="column is-5">
            <div class="columns is-mobile is-multiline">
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard
                  v-if="$context.highlights[1]"
                  :highlight="$context.highlights[1]"
                />
              </div>
              <div class="column is-12-tablet is-6-mobile">
                <HighlightCard
                  v-if="$context.highlights[2]"
                  :highlight="$context.highlights[2]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="popular">
        <h3>Populaire categorieën</h3>
        <div class="columns is-multiline is-mobile">
          <template v-for="collection of $context.collections.slice(0, 5)">
            <div class="column is-6-mobile is-4-tablet is-one-fifth-desktop">
              <g-link :to="`/categorie/${collection.slug}/`">
                <CategoryCard
                  :name="collection.name"
                  :image="maybeThumbnail(collection.featuredAsset)"
                />
              </g-link>
            </div>
          </template>
        </div>
      </section>

      <FavoritesSection :favorites="$context.favorites" />
    </template>

    <template #fullwidth>
      <div class="columns is-vcentered content">
        <div class="column">
          <div class="has-text-light" v-html="$context.shortAbout"></div>
        </div>
        <div class="column p-6">
          <img src="/img/cantastic-white.png" alt="Cantastic logo" />
        </div>
      </div>
    </template>

    <template #content2>
      <section id="blog">
        <h3><g-link to="/blog/" class="has-text-dark">Blog</g-link></h3>
        <div class="columns">
          <template v-for="blog of $context.blogs">
            <div class="column">
              <BlogCard :blog="blog" />
            </div>
          </template>
        </div>
      </section>

      <section id="brands">
        <h3>Onze merken</h3>
        <div
          class="columns is-multiline is-mobile is-justify-content-space-between"
        >
          <template v-for="collection of $context.brands">
            <div class="column is-3-mobile is-2-tablet is-1-desktop">
              <g-link :to="`/categorie/${collection.slug}/`">
                <LogoCard
                  :logo="maybeThumbnail(collection.featuredAsset)"
                  :name="collection.name"
                >
                </LogoCard>
              </g-link>
            </div>
          </template>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script>
import { hydrate } from 'pinelab-storefront';
import HighlightCard from '../components/HighlightCard';
import BlogCard from '../components/BlogCard';
import FavoritesSection from '../components/FavoritesSection';
import LogoCard from '../components/LogoCard';

export default {
  components: {
    BlogCard,
    HighlightCard,
    FavoritesSection,
    LogoCard,
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
    await hydrate(this.$context.favorites, this.$vendure);
  },
};
</script>
<style></style>
