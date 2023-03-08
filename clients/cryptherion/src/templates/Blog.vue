<template>
  <Layout>
    <section id="blog">
      <PopupImage
        :small="getDefaultImage($context.blog.featured_image.id)"
        :alt="`Afbeelding voor ${$context.blog.title}`"
        class="blog-header mb-6"
        :large="getDefaultImage($context.blog.featured_image.id)"
      />

      <h1>{{ $context.blog.title }}</h1>

      <article class="media mb-4">
        <figure class="media-left">
          <p class="image is-64x64">
            <b-image
              :src="
                getSquareImage(maybeGetId($context.blog.user_created.avatar))
              "
              :alt="$context.blog.user_created.first_name"
              class="is-rounded"
            />
          </p>
        </figure>
        <div class="media-content">
          <p class="content has-text-grey">
            <strong
              >{{ $context.blog.user_created.first_name }}
              {{ $context.blog.user_created.last_name }}</strong
            >
            <br />
            <small> {{ $context.blog.date_created | formatDate }}</small>
          </p>
        </div>
      </article>

      <main class="content" v-html="$context.blog.content"></main>
    </section>

    <br />
    <br />

    <section id="related-blogs" v-if="$context.relatedBlogs">
      <h3 class="mb-2">Meer blogs van Cryptherion</h3>
      <div class="columns">
        <template v-for="blog of $context.relatedBlogs">
          <div class="column is-one-third">
            <BlogCard :blog="blog" />
          </div>
        </template>
      </div>
    </section>
  </Layout>
</template>
<script>
import BlogCard from '../components/BlogCard';
export default {
  components: { BlogCard },
  methods: {
    maybeGetId(idHolder) {
      return idHolder?.id;
    },
  },
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    const title = this.$context.blog.title;
    const seoDescription = this.$context.blog.description;
    const image = this.getDefaultImage(this.$context.blog.featured_image?.id);
    return {
      title,
      meta: [
        { key: 'title', name: 'title', content: title },
        { key: 'description', name: 'description', content: seoDescription },
        { key: 'og:title', name: 'og:title', content: title },
        {
          key: 'og:description',
          name: 'og:description',
          content: seoDescription,
        },
        { key: 'og:image', name: 'og:image', content: image },
        { key: 'og:type', name: 'og:type', content: 'blog' },
        { key: 'og:url', name: 'og:url', content: url },
      ],
    };
  },
};
</script>
<style>
.content img {
  border-radius: 6px;
  margin: 1.5rem auto;
  display: block;
}
.content iframe {
  width: 100%;
}
.blog-header img {
  border-radius: 6px;
  max-height: 400px;
  width: 100%;
  object-fit: cover;
}
.blog-header .modal img {
  max-height: 100%;
}
.is-rounded img {
  border-radius: 50%;
}
</style>
