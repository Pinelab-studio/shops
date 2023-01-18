<template>
  <div>
    <!-- thumbnail display -->
    <div @click="show = true">
      <b-image
        :src="small"
        :alt="alt"
        :placeholder="placeholder"
        class="is-clickable"
      />
    </div>

    <!-- Modal -->
    <b-modal v-model="show">
      <template v-if="assets && assets.length > 1">
        <!-- Show carousel for multiple images -->
        <b-carousel
          :arrow="true"
          :repeat="true"
          :arrow-hover="false"
          icon-pack="mdi"
          :autoplay="false"
          :pause-info="false"
          v-model="carouselItem"
        >
          <b-carousel-item v-for="(asset, i) in assets" :key="i">
            <b-image
              :src="asset"
              :alt="alt"
              :placeholder="placeholder"
              class="is-clickable max-90-vh"
            />
          </b-carousel-item>
        </b-carousel>
      </template>
      <template v-else>
        <!-- Single image modal -->
        <b-image
          :src="large"
          :alt="alt"
          :placeholder="placeholder"
          class="is-clickable max-90-vh"
        />
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ['small', 'alt', 'large', 'placeholder', 'assets'],
  data() {
    const currentItem = this.assets?.findIndex((asset) => asset === this.large);
    return {
      show: false,
      carouselItem: currentItem || 0,
    };
  },
};
</script>
<style>
.max-90-vh img {
  max-height: 90vh;
  object-fit: contain;
}
</style>
