<template>
  <g-link :to="slug">
    <div class="card card-background-image container-overlay">
      <div class="card-image is-fullheight">
        <b-image class="is-fullheight" ratio="2by1" :src="image"></b-image>
        <div class="overlay"></div>
      </div>
      <div class="card-content-no-show has-background-success p-5">
        <div class="media">
          <div class="media-content">
            <p class="title has-text-white has-text-weight-bold is-5">
              {{ title }}
            </p>
            <HomeButton>Koop nu</HomeButton>
          </div>
        </div>
      </div>
    </div>
  </g-link>
</template>
<script>
import HomeButton from '@/components/HomeButton';

export default {
  props: ['title', 'image', 'slug'],
  components: { HomeButton },
};
</script>
<style>
.card-background-image {
  min-height: 150px;
  height: 100%;
}

.card-content-no-show {
  bottom: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
}

.is-fullheight,
.is-fullheight img {
  height: 100%;
}
</style>
