<template>
  <Layout>
    <img
      :src="lang === 'nl' ? enFlag : nlFlag"
      class="lang-flag is-clickable"
      @click="changeLanguage()"
    />
    <h1>{{ title }}</h1>
    <div v-html="content"></div>
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-12-mobile is-4-desktop is-6-tablet mb-4"
        v-for="image of images"
        :key="image"
      >
        <PopupImage
          :small="getSquareImage(image)"
          alt="Roy Schreuder workshop"
          :large="getDefaultImage(image)"
          class="mb-4"
        />
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      title: undefined,
      content: undefined,
      images: [],
      lang: 'nl',
      enFlag: '/en.svg',
      nlFlag: '/nl.svg',
    };
  },
  created() {
    this.title = this.$context.workshops.title_nl;
    this.content = this.$context.workshops.content_nl;
    this.images = this.$context.workshops.images.map(
      (image) => image.directus_files_id.id
    );
  },
  methods: {
    changeLanguage() {
      if (this.lang === 'en') {
        // change to NL
        this.title = this.$context.workshops.title_nl;
        this.content = this.$context.workshops.content_nl;
        this.lang = 'nl';
      } else {
        // change to EN
        this.title = this.$context.workshops.title_en;
        this.content = this.$context.workshops.content_en;
        this.lang = 'en';
      }
    },
  },
};
</script>
