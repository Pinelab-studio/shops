<template>
  <div class="media">
    <div class="media-left">
      <img v-if="item.thumbnail" width="32" :src="item.thumbnail" />
      <img v-else width="32" src="/favicon.png" />
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
