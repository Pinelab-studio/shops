<template>
  <article>
    <g-link :to="`/blog/${blog.slug}`">
      <b-image
        :src="getSquareImage(blog.featured_image.id)"
        :alt="`Afbeelding voor ${blog.title}`"
        class="rounded blog-card-image"
      />
    </g-link>
    <h5 class="my-1">{{ blog.title }}</h5>
    <p class="is-size-7 has-text-grey mb-2">
      {{ blog.date_created | formatDate }} door
      {{ blog.user_created.first_name }}
    </p>
    <p class="content">
      {{ blog.summary }}
      <br />
      <g-link :to="`/blog/${blog.slug}`">Lees artikel</g-link>
    </p>
  </article>
</template>
<script>
export default {
  props: ['blog'],
};
</script>
<style>
.blog-card-image img {
  height: 300px;
  width: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.blog-card-image:hover,
.blog-card-image:focus {
  opacity: 0.9;
}
</style>
