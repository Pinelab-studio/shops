<template>
  <div v-if="text">
    <div :class="{ 'collapsed-3': isCollapsed }" class="mb-0">{{ text }}</div>
    <div v-if="isTextLongEnough && isCollapsed" class="has-text-right">
      <a @click="isCollapsed = false">{{ $l('common.read-more') }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['text'],
  data() {
    return {
      isCollapsed: true,
      maxLength: 200,
    };
  },
  created() {
    this.transformToPlainText(this.description);
  },
  computed: {
    isTextLongEnough() {
      return this.text?.length > this.maxLength;
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
