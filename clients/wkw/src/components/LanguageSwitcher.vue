<template>
  <div>
    <a v-if="$context.lang === 'en'" :href="getTranslatedUrl('nl')"
      ><img src="/img/nl.svg" class="lang-flag" alt="Nederlands"
    /></a>
    <a v-else :href="getTranslatedUrl('en')"
      ><img src="/img/en.svg" class="lang-flag" alt="English"
    /></a>
  </div>
</template>
<script>
export default {
  methods: {
    getTranslatedUrl(lang) {
      const root = lang === 'nl' ? '/' : `/${lang}/`;
      return this.$context.translatedPages?.[lang] || root;
    },
  },
};
</script>
<style>
.lang-flag {
  height: 15px;
}
</style>
