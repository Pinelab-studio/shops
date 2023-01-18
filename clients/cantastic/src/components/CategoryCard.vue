<template>
  <div class="">
    <div
      class="box category-card mb-1"
      :style="`background-image: url(${image});`"
    ></div>
    <h5 class="has-text-centered" style="z-index: 2">
      {{ name }}
    </h5>
  </div>
</template>
<script>
export default {
  props: ['image', 'name'],
};
</script>
<style>
.category-card {
  min-height: 150px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: transform 0.2s; /* Animation */
}

.category-card:focus,
.category-card:hover {
  transform: scale(1.1);
}
</style>
