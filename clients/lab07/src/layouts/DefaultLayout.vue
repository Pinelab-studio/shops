<template>
  <div>
    <Preloader v-if="showPreloader" />
    <template>
      <b-navbar shadow class="is-fixed-top">
        <template #brand>
          <b-navbar-item id="logo" tag="router-link" :to="{ path: '/' }">
            <img src="/logo.svg" />
          </b-navbar-item>
        </template>
        <template #end>
          <g-link class="mx-3 navbar-item" to="/shop/">SHOP</g-link>
          <g-link class="mx-3 navbar-item" to="/over-ons/">OVER ONS</g-link>
          <g-link class="mx-3 navbar-item" to="/contact/">CONTACT</g-link>
          <Basket
            class="is-flex"
            :vendure="$vendure"
            :store="$store"
            :emitter="$emitter"
            cartUrl="/winkelmand/"
            checkoutUrl="/checkout/"
            v-slot="{ nrOfItems, open }"
          >
            <a class="mx-3 navbar-item" @click="open()"
              >WINKELMAND ({{ nrOfItems }})</a
            >
          </Basket>
        </template>
      </b-navbar>
    </template>

    <div>
      <template v-if="$slots.default">
        <div
          class="container is-widescreen section"
          style="min-height: 90vh; padding-top: 150px"
        >
          <Breadcrumb
            v-if="$context.breadcrumb"
            :crumbs="$context.breadcrumb"
          />

          <br />

          <slot />
        </div>
      </template>

      <slot name="fullwidth" />
    </div>

    <Consent
      accept-text="Ja hoor"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      We sturen geanonimiseerde gegevens naar Google analytics om het gebruik
      van onze site te meten, vind je dat goed?
      <br />
      <a href="/privacy.pdf" target="_blank">Lees onze privacy policy</a>
    </Consent>

    <footer v-if="!hideFooter" class="footer">
      <div class="content has-text-centered">
        <g-link :to="$context.instagramUrl" target="_blank">
          <span class="icon is-small">
            <i class="mdi mdi-instagram"> </i>
          </span>
        </g-link>
        • LAB07 • KVK {{ $context.kvk }} •
        <g-link :to="`mailto:${$context.emailAddress}`" target="_blank"
          >{{ $context.emailAddress }}
        </g-link>
        •
        <g-link to="/privacy.pdf" target="_blank">privacy</g-link>
        •
        <g-link to="/voorwaarden.pdf" target="_blank"
          >algemene voorwaarden en levering
        </g-link>
        •
        <g-link to="https://pinelab.studio/" target="_blank"
          >Made with ❤ by pinelab
        </g-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag';
import Consent from 'pinelab-storefront/lib/components/Consent';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Basket from 'pinelab-storefront/lib/components/Basket';
import Preloader from '../components/Preloader.vue';

export default {
  props: ['hideFooter', 'showPreloader'],
  components: { Consent, Breadcrumb, Basket, Preloader },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
};
</script>
<style>
a.navbar-item:hover {
  text-decoration: underline;
}
</style>
