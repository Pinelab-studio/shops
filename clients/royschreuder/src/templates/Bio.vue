<template>
  <Layout>
    <img
      :src="lang === 'nl' ? enFlag : nlFlag"
      class="lang-flag is-clickable"
      @click="changeLanguage()"
    />
    <h1>{{ title }}</h1>
    <div v-html="content"></div>
    <img :src="getDefaultImage(image)" alt="Roy Schreuder" />
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      title: undefined,
      content: undefined,
      image: undefined,
      lang: 'nl',
      enFlag: '/en.svg',
      nlFlag: '/nl.svg',
    };
  },
  created() {
    this.title = this.$context.bio.title_nl;
    this.content = this.$context.bio.content_nl;
    this.image = this.$context.bio.image.id;
  },
  methods: {
    changeLanguage() {
      if (this.lang === 'en') {
        // change to NL
        this.title = this.$context.bio.title_nl;
        this.content = this.$context.bio.content_nl;
        this.lang = 'nl';
      } else {
        // change to EN
        this.title = this.$context.bio.title_en;
        this.content = this.$context.bio.content_en;
        this.lang = 'en';
      }
    },
  },
};
</script>
