<template>
  <div class="media search-result">
    <div class="media-left">
      <img v-if="item.thumbnail" width="50" :src="item.thumbnail" />
      <img v-else width="50" src="/favicon.png" />
    </div>
    <div class="media-content">
      {{ item.name }}
      <br />
      <small>
        <span v-if="item.collections" class="has-text-grey">
          {{ item.collections.join(', ') }}
        </span>
        <b>{{ item.price | euro }}</b>
      </small>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
};
</script>
<style>
.search-result img {
  border-radius: 0.25rem;
}
</style>
