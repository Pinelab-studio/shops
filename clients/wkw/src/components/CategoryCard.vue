<template>
  <g-link :to="slug">
    <div class="card container-overlay">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="image" />
        </figure>
        <div class="overlay"></div>
        <div class="centered" style="width: 100%">
          <p
            class="title has-text-weight-bold has-text-white has-text-centered is-5"
          >
            {{ title }}
          </p>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
export default {
  props: ['title', 'image', 'slug'],
};
</script>

<style scoped>
.overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.65); /* Black see-through */
  width: 100%;
  height: 100%;
  transition: 0.3s ease;
  opacity: 1;
  border-radius: 0.25rem;
}

/* When you mouse over the container, fade in the overlay*/
.container-overlay:hover .overlay {
  opacity: 0.5;
}

.title {
  word-break: normal;
}
</style>
