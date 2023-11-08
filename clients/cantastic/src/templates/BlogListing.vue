<template>
  <DefaultLayout>
    <template #content>
      <section id="blog">
        <h3>Blogs</h3>
        <div class="columns is-multiline">
          <template v-for="blog of $context.blogs">
            <div class="column is-4">
              <BlogCard :blog="blog" />
            </div>
          </template>
        </div>
      </section>

      <FavoritesSection :favorites="$context.favorites" />
    </template>
  </DefaultLayout>
</template>

<script>
import BlogCard from '../components/BlogCard';
import FavoritesSection from '../components/FavoritesSection';

export default {
  components: {
    FavoritesSection,
    BlogCard,
  },
};
</script>
<style></style>
