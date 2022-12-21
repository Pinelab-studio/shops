<template>
  <div v-if="description">
    <div :class="`collapsed-${collapse} mb-0`">{{ plaintext }}</div>
    <div v-if="isDescriptionLongEnough" class="has-text-right">
      <a href="#full-description">Lees meer</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['description', 'maxLength', 'collapse'],
  data() {
    return {
      plaintext: this.description
        ?.replace(/<[^>]+>/g, ' ')
        ?.replaceAll('&nbsp;', ' '),
    };
  },

  computed: {
    isDescriptionLongEnough() {
      return this.description?.length > this.maxLength;
    },
  },
};
</script>
<style>
#full-description::before {
  display: block;
  content: ' ';
  height: 200px;
  visibility: hidden;
  pointer-events: none;
}
</style>
