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
