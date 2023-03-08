<template>
  <Layout>
    <template>
      <section id="blog">
        <h3 class="mb-2">Cryptherion blogs</h3>
        <div class="columns">
          <template v-for="blog of $context.blogs">
            <div class="column">
              <BlogCard :blog="blog" />
            </div>
          </template>
        </div>
      </section>
    </template>
  </Layout>
</template>

<script>
import BlogCard from '../components/BlogCard';

export default {
  components: {
    BlogCard,
  },
};
</script>
<style></style>
