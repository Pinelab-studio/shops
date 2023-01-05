<template>
  <g-link :to="slug">
    <div class="card container-overlay">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="image" />
        </figure>
        <div class="hover-overlay"></div>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title has-text-weight-bold is-6">{{ title }}</p>
            <p class="subtitle is-6">{{ price | euro }}</p>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
export default {
  props: ['title', 'image', 'price', 'slug'],
};
</script>

<style></style>
