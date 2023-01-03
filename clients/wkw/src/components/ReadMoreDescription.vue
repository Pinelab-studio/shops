<template>
  <div v-if="description">
    <div :class="`collapsed-${collapse} mb-0`">{{ plaintext }}</div>
    <div v-if="isDescriptionLongEnough" class="has-text-right">
      <a href="#full-description">{{ $l('common.read-more') }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['description', 'maxLength', 'collapse'],
  watch: {
    description(newValue, oldValue) {
      this.transformToPlainText(newValue);
    },
  },
  data() {
    return {
      plaintext: '',
    };
  },
  created() {
    this.transformToPlainText(this.description);
  },
  methods: {
    /**
     * Transforms the HTML description to plaintext, otherwise safari's line-clamp won't work
     * https://stackoverflow.com/questions/70897195/line-clamp-webkit-not-working-in-safari
     */
    transformToPlainText(description) {
      this.plaintext = description
        ?.replace(/<[^>]+>/g, ' ')
        ?.replaceAll('&nbsp;', ' ');
    },
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
