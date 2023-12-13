<template>
  <DefaultLayout>
    <template #content>
      <section :id="$context.collection.slug">
        <h1>{{ $context.collection.name }}</h1>
        <br />

        <div class="columns is-multiline is-mobile">
          <template v-for="collection of $context.childCollections">
            <div class="column is-6-mobile is-4-tablet is-4-desktop">
              <g-link :to="`/categorie/${collection.slug}/`">
                <CategoryCard
                  :name="collection.name"
                  :image="maybeThumbnail(collection.featuredAsset)"
                  :centered="true"
                />
              </g-link>
            </div>
          </template>
        </div>
        <div
          id="full-description"
          class="content"
          v-if="$context.collection.description"
          v-html="$context.collection.description"
        ></div>
      </section>
    </template>
  </DefaultLayout>
</template>
<script>
import { getMetaInfo } from 'pinelab-storefront';

export default {
  metaInfo() {
    const url = `${process.env.GRIDSOME_HOST}${this.$route.fullPath}`;
    console.log(getMetaInfo(this.$context.collection, url));
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
