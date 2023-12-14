<template>
  <g-link :to="slug">
    <div class="card container-overlay" style="height: 100%">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="image" />
        </figure>
        <div class="hover-overlay"></div>
        <div v-if="banner" class="is-overlay">
          <span class="tag is-dark-green product-banner">{{ banner }}</span>
        </div>
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
  props: ['title', 'image', 'price', 'slug', 'facetValues'],
  computed: {
    banner() {
      return this.facetValues.find((f) => f.facet.code === 'banners')?.name;
    },
  },
};
</script>

<style scoped>
.media-content {
  overflow-x: clip;
}

.product-banner {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 0;
}
</style>
