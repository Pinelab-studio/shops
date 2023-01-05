<template>
  <button class="button is-white is-outlined has-text-weight-bold">
    <slot />
  </button>
</template>
<script>
export default {
  props: [],
};
</script>

<style>
.button {
  border-radius: 5px;
  border: 1.5px solid;
}
</style>
