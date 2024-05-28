<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <div class="columns">
          <div
            v-if="$context.childCollections || $context.siblings"
            class="column is-3 siblings is-hidden-mobile"
          >
            <!---- Desktop filter ----->
            <g-link
              v-for="collection of $context.childCollections ||
              $context.siblings"
              :to="`/categorie/${collection.slug}/`"
              :key="collection.slug"
              class="has-text-dark"
              :class="{ 'is-bold': collection.id === $context.collection.id }"
            >
              {{ collection.name }}<br />
            </g-link>
          </div>
          <div class="column">
            <!----------------Title ------------->
            <h1>{{ $context.collection.name }}</h1>

            <!-- Mobile filter --------->
            <div class="is-hidden-desktop is-hidden-tablet">
              <g-link
                v-for="collection of $context.childCollections ||
                $context.siblings"
                :to="`/categorie/${collection.slug}/`"
                :key="collection.slug"
                class="button is-small mr-2 mb-2"
                :class="{
                  'is-outlined': collection.id !== $context.collection.id,
                }"
              >
                {{ collection.name }}
              </g-link>
            </div>
            <ReadMoreDescription
              :description="$context.collection.description"
              :max-length="100"
              :collapse="1"
            />
            <div v-if="totalProducts > 5" class="has-text-right">
              <b>{{ $context.products.length }}</b> producten
              <b-select
                placeholder="Sorteer op"
                style="display: inline-flex"
                v-model="sortedBy"
                @input="sort($event)"
              >
                <option value="price-asc">Laagste prijs</option>
                <option value="popularity">Populariteit</option>
              </b-select>
            </div>

            <!----------------Products ------------->
            <template v-if="products && products.length">
              <div class="columns is-6 is-variable is-multiline is-mobile">
                <template v-for="product of products">
                  <div class="column is-6-mobile is-4-tablet is-3-desktop">
                    <ProductCard :product="product" />
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div>
                We hebben op dit moment geen producten in
                {{ $context.collection.name }}. <br />
                Je kan je inschrijven op de nieuwsbrief om op de hoogte te
                blijven:
              </div>
              <br />
              <NewsletterForm />
            </template>

            <!-------------- Pagination ----------------------->
            <br />
            <div v-if="totalProducts > itemsPerPage" class="columns">
              <div class="column">
                <Pagination
                  :total="$context.products.length"
                  @change="setPage($event)"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="full-description"
          class="content"
          v-html="$context.collection.description"
        ></div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import Pagination from '../components/Pagination';
import ReadMoreDescription from '../components/ReadMoreDescription';
import { getMetaInfo, hydrate } from 'pinelab-storefront';
import NewsletterForm from '../components/NewsletterForm';

export default {
  components: { NewsletterForm, ReadMoreDescription, Pagination },
  data() {
    return {
      itemsPerPage: 24,
      products: [],
      sortedBy: 'popularity',
      totalProducts: 0,
    };
  },
  created() {
    this.loadFirstPage();
    this.sort(this.sortedBy);
    this.totalProducts = this.$context.products?.length;
  },
  computed: {
    totalPages() {
      return Math.floor(this.$context.products?.length / this.itemsPerPage);
    },
  },
  methods: {
    setPage({ start, end }) {
      this.products = this.$context.products.slice(start, end);
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    },
    loadFirstPage() {
      this.products = this.$context.products.slice(0, this.itemsPerPage);
    },
    sort(value) {
      if (value === 'price-asc') {
        this.$context.products.sort((a, b) => a.lowestPrice - b.lowestPrice);
      } else if (value === 'alphabet') {
        this.$context.products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (value === 'popularity') {
        this.$context.products.sort((a, b) => {
          console.log(a.soldOut);
          if (a.soldOut) {
            // Move soldout to the bottom
            return -1;
          }
          return (
            b.customFields.popularityScore - a.customFields.popularityScore
          );
        });
      }
      this.loadFirstPage();
    },
  },
  async mounted() {
    await hydrate(this.$context.products, this.$vendure);
  },
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    return getMetaInfo(this.$context.collection, url);
  },
};
</script>
<style>
.siblings a:hover {
  text-decoration: underline;
}

.is-bold {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
