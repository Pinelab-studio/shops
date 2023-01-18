<template>
  <div class="rounded logo-card">
    <b-image :src="logo" :alt="name" />
  </div>
</template>
<script>
export default {
  props: ['logo', 'name'],
};
</script>
<style>
.logo-card img {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: transform 0.2s; /* Animation */
}
.logo-card img:hover {
  transform: scale(1.05);
}
</style>
