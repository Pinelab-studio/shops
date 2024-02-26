<template>
  <Layout>
    <h1>Artwork</h1>
    <br />
    <b-field>
      <b-radio-button
        v-for="category in categories"
        :native-value="category"
        v-model="selectedCategory"
        :key="category"
        @input="showSelectedCategory"
        type="is-primary is-outlined"
      >
        {{ category }}
      </b-radio-button>
    </b-field>
    <br />
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-12-mobile is-4-desktop is-6-tablet mb-4"
        v-for="artwork of artworks"
        :key="artwork.title"
      >
        <PopupImage
          :small="getSquareImage(artwork.image.id)"
          :alt="artwork.image.title"
          :large="getDefaultImage(artwork.image.id)"
          class="mb-4"
        />
        <h4>{{ artwork.title }}</h4>
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      artworks: [],
      categories: [],
      selectedCategory: undefined,
    };
  },
  created() {
    this.artworks = this.$context.artwork;
    // Get unique categories
    const categories = new Set();
    categories.add('All');
    this.$context.artwork.forEach((artwork) =>
      artwork.category?.forEach((category) => categories.add(category))
    );
    this.categories = Array.from(categories);
  },
  methods: {
    showSelectedCategory() {
      if (this.selectedCategory === 'All') {
        this.artworks = this.$context.artwork;
        return;
      }
      this.artworks = this.$context.artwork.filter((artwork) =>
        artwork.category?.includes(this.selectedCategory)
      );
    },
  },
};
</script>
