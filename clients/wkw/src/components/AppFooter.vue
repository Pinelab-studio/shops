<template>
  <footer class="footer has-text-white">
    <div class="container is-widescreen section py-0">
      <div class="columns">
        <div class="column">
          <h4 class="has-text-weight-bold is-5 mb-3">Categorieën</h4>
          <template v-for="collection in collections">
            <g-link :to="collection.url">
              <p class="has-text-white hover-underline">
                {{ collection.name }}
              </p>
            </g-link>
          </template>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5 mb-3">Info</h4>
          <g-link to="/">
            <div
              class="has-text-white"
              v-html="$context.common.openingstijden"
            ></div>
          </g-link>
          <br />
          <g-link to="/">
            <p class="has-text-white" v-html="$context.common.adres"></p>
          </g-link>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5 mb-3">Contact</h4>
          <template>
            <g-link to="tel:0031 6 18441825">
              <p class="has-text-white hover-underline">
                {{ $context.common.telefoon }}
              </p>
            </g-link>
            <g-link to="mailto:info@wormenkwekerijwasse.nl">
              <p class="has-text-white hover-underline">
                {{ $context.common.email }}
              </p>
            </g-link>
          </template>
        </div>
        <div class="column">
          <h4 class="has-text-weight-bold is-5 mb-3">FAQ</h4>
          <template v-for="page in pages">
            <g-link :to="page.url">
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
