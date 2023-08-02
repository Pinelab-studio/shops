<template>
  <b-notification
    v-if="!hasBeenClosed"
    type="is-primary"
    aria-close-label="Sluiten"
    v-on:close="onClose()"
  >
    <div v-html="htmlContent"></div>
  </b-notification>
</template>
<script>
export default {
  props: ['htmlContent'],
  data() {
    return {
      hasBeenClosed: false,
    };
  },
  async created() {
    // If htmlContent is the same, that means this popup was closed before by the client
    this.hasBeenClosed =
      window.localStorage.getItem('cantastic_notification') ===
      this.htmlContent;
  },
  methods: {
    onClose() {
      window.localStorage.setItem('cantastic_notification', this.htmlContent);
    },
  },
};
</script>
