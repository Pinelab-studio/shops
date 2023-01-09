<template>
  <footer class="footer has-text-white">
    <div class="container is-widescreen section py-0">
      <div class="columns">
        <div class="column">
          <h4 class="has-text-weight-bold is-5">Categorieën</h4>
          <template v-for="collection in collections">
            <g-link :to="collection.url">
              <p class="has-text-white hover-underline">
                {{ collection.name }}
              </p>
            </g-link>
          </template>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5">Info</h4>
          <template v-for="index in 5">
            <g-link to="/">
              <p class="has-text-white hover-underline">Privacy Beleid</p>
            </g-link>
          </template>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5">Contact</h4>
          <template>
            <g-link to="/">
              <p class="has-text-white hover-underline">
                {{ $context.common.telefoon }}
              </p>
            </g-link>
            <g-link to="/">
              <p class="has-text-white hover-underline">
                {{ $context.common.email }}
              </p>
            </g-link>
            <br />
            <g-link to="/">
              <p
                class="has-text-white hover-underline"
                v-html="$context.common.adres"
              ></p>
            </g-link>
            <br />
            <g-link to="/">
              <p
                class="has-text-white hover-underline"
                v-html="$context.common.openingstijden"
              ></p>
            </g-link>
          </template>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5">FAQ</h4>
          <template v-for="page in $context.pageLinks">
            <g-link :to="page.slug">
              <p class="has-text-white hover-underline">
                {{ page.title }}
              </p>
            </g-link>
          </template>
        </div>
      </div>
      <div class="has-text-right">
        <a
          class="has-text-white"
          href="https://pinelab.studio/"
          target="_blank"
          >{{ $l('common.made-by') }}</a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['collections', 'pages'],
};
</script>
<style>
.hover-underline:hover {
  text-decoration: underline;
}
</style>
