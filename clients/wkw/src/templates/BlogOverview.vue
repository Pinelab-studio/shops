<template>
  <DefaultLayout>
    <template #content>
      <section id="blogs">
        <h4 class="title has-text-weight-bold is-5 pt-5">Blogs</h4>
        <div class="columns is-multiline is-mobile">
          <template v-for="blog in $context.blogs">
            <div
              class="column is-one-third-desktop is-half-tablet is-12-mobile"
            >
              <BlogCard
                :key="blog.slug"
                :image="getSquareImage(blog.image)"
                :title="blog.title"
                :fName="blog.fName"
                :lName="blog.lName"
                :date="blog.date"
                :content="blog.short_description"
                :url="blog.url"
              />
            </div>
          </template>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import BlogCard from '@/components/BlogCard.vue';

export default {
  components: { BlogCard },
};
</script>
