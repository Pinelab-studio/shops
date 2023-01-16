<template>
  <DefaultLayout #content>
    <section id="blogs">
      <h4 class="title has-text-weight-bold is-5 pt-5">Blogs</h4>
      <div class="columns is-multiline is-mobile">
        <template v-for="blog in $context.blogs">
          <div class="column is-6-mobile">
            <BlogCard
              :image="blog.featured_image.id"
              :title="blog.titel"
              :fName="blog.user_created.first_name"
              :lName="blog.user_created.last_name"
              :date="blog.date_created | date"
              :content="blog.content"
            />
          </div>
        </template>
      </div>
    </section>
  </DefaultLayout>
</template>
<script>
import BlogCard from '@/components/BlogCard.vue';

export default {
  components: { BlogCard },
};
</script>
