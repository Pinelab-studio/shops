<template>
  <g-link :to="highlight.button_link">
    <div
      class="box card-background-image is-flex is-align-items-end highlight-card"
      :style="`background-image: url(${getDefaultImage(highlight.image.id)});`"
    >
      <div>
        <h3 class="has-text-white pt-5 mb-0">{{ highlight.title }}</h3>
        <p v-if="highlight.subtitle" class="has-text-white pb-3">
          {{ highlight.subtitle }}
        </p>
        <CantasticButton class="mt-3" is-div="true">{{
          highlight.button_text
        }}</CantasticButton>
      </div>
    </div>
  </g-link>
</template>
<script>
import CantasticButton from './CantasticButton';

export default {
  components: { CantasticButton },
  props: ['highlight'],
};
</script>
<style>
.card-background-image {
  min-height: 150px;
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.5);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}

.card-background-image:hover,
.card-background-image:focus {
  box-shadow: inset 0 0 0 1000px rgba(35, 57, 91, 0.1);
}
</style>
