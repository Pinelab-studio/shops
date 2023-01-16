<template>
  <div v-if="!$context.hideLanguageSwitcher">
    <a v-if="$context.lang === 'en'" @click="goTo('nl')"
      ><img src="/img/nl.svg" class="lang-flag" alt="Nederlands"
    /></a>
    <a v-else @click="goTo('en')"
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
    async goTo(lang) {
      const root = lang === 'nl' ? '/' : `/${lang}/`;
      const url = this.$context.translatedPages?.[lang] || root;
      await this.$router.push(url);
      location.reload(); // force reload after language change
    },
  },
};
</script>
<style>
.lang-flag {
  height: 15px;
}
</style>
