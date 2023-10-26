<template>
  <b-field>
    <b-autocomplete
      :data="results"
      placeholder="Zoek producten..."
      field="title"
      :loading="false"
      @typing="search"
      @focus="loadIndexAsync"
      icon="magnify"
      clearable
      @select="select"
      max-height="400px"
    >
      <template #header>
        <span class="has-text-grey"
          >{{ results.length }} producten gevonden</span
        >
      </template>
      <template slot-scope="result">
        <SearchResult :item="result.option.item" />
      </template>
    </b-autocomplete>
  </b-field>
</template>
<script>
import debounce from 'debounce';
import SearchResult from './SearchResult';
import { SearchUtil } from 'pinelab-storefront';
import Fuse from 'fuse.js';

export default {
  components: { SearchResult },
  data() {
    return {
      fuse: undefined,
      results: [],
      isLoading: false,
      loadingIndexPromise: undefined,
    };
  },
  methods: {
    async loadIndex() {
      const res = await fetch('/_search-cache.json');
      if (!res.ok) {
        throw Error(`Unable to fetch SearchIndex: ${res.statusText}`);
      }
      const searchIndex = await res.json();
      const searchUtil = new SearchUtil(Fuse);
      this.fuse = searchUtil.createFuse(searchIndex, {
        threshold: 0.5,
      });
      console.log('Fetched search index JSON and created Fuse');
    },
    // Save as promise
    async loadIndexAsync() {
      if (!this.fuse) {
        this.loadingIndexPromise = this.loadIndex();
      }
    },
    async search(keyword) {
      try {
        this.isLoading = true;
        await this.loadingIndexPromise;
        this.results = this.fuse.search(keyword) || [];
        console.log(`Found ${this.results.length} results for ${keyword}`);
      } finally {
        this.loadingResults = false;
      }
    },
    select(result) {
      if (!result) {
        return;
      }
      this.$router.push(`/product/${result.item.slug}`);
    },
  },
  created() {
    this.search = debounce(this.search, 500);
  },
};
</script>
