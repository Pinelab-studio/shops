<template>
  <Layout>
    <template #content>
      <h1>{{ $context.category }}</h1>
      <br />

      <section :id="project.title" v-for="project of items">
        <hr />
        <div class="columns">
          <div class="column is-4">
            <h2>{{ project.title }}</h2>
            <h4 class="subtitle">{{ project.subtitle }}</h4>
            <!--            <small class="has-text-grey">{{
              project.datum | formatDate
            }}</small>-->
            <div v-html="project.description"></div>
          </div>
          <div class="column is-4">
            <div class="columns is-5 is-mobile is-multiline">
              <div class="column is-one-third" v-for="image of project.images">
                <PopupImage
                  :small="getSquareImage(image.directus_files_id.id)"
                  :alt="image.directus_files_id.title"
                  :large="getDefaultImage(image.directus_files_id.id)"
                  placeholder="/img/placeholder.png"
                  :assets="mapToImageUrl(project.images)"
                />
              </div>
            </div>
          </div>
          <div class="column is-4">
            <iframe
              v-if="project.video_url"
              width="100%"
              height="auto"
              :src="project.video_url"
              :title="project.title"
              allow="autoplay; picture-in-picture"
              allowfullscreen
              class="portfolio-iframe"
            ></iframe>
            <PopupImage
              v-else
              :small="getSquareImage(project.main_image.id)"
              :alt="project.main_image.title"
              :large="getDefaultImage(project.main_image.id)"
              placeholder="/img/placeholder.png"
            />
          </div>
        </div>
        <br />
      </section>
      <b-pagination
        v-if="$context.projects.length > itemsPerPage"
        class="is-primary"
        :total="$context.projects.length"
        v-model="currentPage"
        range-before="2"
        range-after="2"
        order="is-centered"
        size="default"
        :simple="false"
        :rounded="false"
        :per-page="itemsPerPage"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Volgende pagina"
        aria-previous-label="Vorige pagina"
        aria-page-label="Pagina"
        aria-current-label="Huidige pagina"
        :page-input="false"
        page-input-position="is-input-right"
        debounce-page-input="100"
        @change="setPage()"
      >
      </b-pagination>
    </template>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 6,
      items: [],
    };
  },
  created() {
    this.items = this.$context.projects.slice(0, this.itemsPerPage);
  },
  methods: {
    setPage() {
      const start = this.itemsPerPage * (this.currentPage - 1);
      const end = start + this.itemsPerPage;
      this.items = this.$context.projects.slice(start, end);
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    },
    mapToImageUrl(images) {
      return images.map((i) => this.getDefaultImage(i.directus_files_id?.id));
    },
  },
};
</script>
<style>
.portfolio-iframe {
  height: 100%;
  min-height: 300px;
}
.pagination-link:focus {
  border-color: transparent;
}
</style>
