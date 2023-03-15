<template>
  <div>
    <AppHeader
      :collections="$context.navbarCollections"
      :key="$route.fullPath"
    />
    <div class="container is-widescreen section navbar-margin pb-6">
      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />
      <slot name="content" />
    </div>
    <div v-if="$slots.fullwidth" class="has-background-primary">
      <div class="container is-widescreen section">
        <slot name="fullwidth" />
      </div>
    </div>
    <div class="container is-widescreen section pt-5 pb-6">
      <slot name="content2" />
    </div>
    <div v-if="showNewsletter" class="has-background-primary">
      <form
        id="sib-form"
        method="POST"
        target="_blank"
        action="https://862544ec.sibforms.com/serve/MUIEAB3bBDn3sAA_u_LMDlffqGvi9t1Hy6KzyCJmLwSlpEpZ7dKPOZl9XZLbaD8a60i16DC6mzD7XMkQWByTq6NkraoaJRpCgmxKPvhoTN8EeD4yyCwSA61_U3eSWYTqOndfcFs2A3U1MwYfY0y39eM_uza0ZEx_gcn_ujfpf7POinolkLhR4FCXHZrg7UoP_Ulu1sYtgD6F4Bsy"
      >
        <div class="container is-widescreen section p-5">
          <div class="has-text-centered">
            <div
              id="newsletterMessage"
              class="has-text-white"
              v-html="$context.common.nieuwsbrief"
            ></div>
          </div>
          <div class="column">
            <b-field position="is-centered" grouped group-multiline>
              <b-input
                maxlength="200"
                type="text"
                id="FIRSTNAME"
                name="FIRSTNAME"
                autocomplete="off"
                :placeholder="$l('review.name')"
              ></b-input>
              <b-input
                type="email"
                id="EMAIL"
                name="EMAIL"
                autocomplete="off"
                :placeholder="$l('customer-details.email')"
              >
              </b-input>
              <p class="control">
                <b-button
                  native-type="submit"
                  type="is-dark-green is-shadowless is-hovered"
                  :label="$l('common.subscribe')"
                />
              </p>
            </b-field>
          </div>
        </div>
      </form>
    </div>
    <AppFooter
      :collections="$context.navbarCollections"
      :pages="$context.pageLinks"
    />
    <Consent
      class="consent pb-6"
      accept-text="Ja, dat is goed"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      <h4>Cookies</h4>
      Vind je het goed dat we geanonimiseerde data naar Google Analytics sturen,
      om de website te verbeteren?
      <br />
    </Consent>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Consent from 'pinelab-storefront/lib/components/Consent';
import { bootstrap } from 'vue-gtag';

export default {
  components: { AppHeader, AppFooter, Breadcrumb, Consent },
  props: {
    showNewsletter: {
      default: true,
      type: Boolean,
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
  methods: {
    async activateAnalytics() {
      console.log(`Cookies approved`);
      await bootstrap();
    },
  },
  // Create href lang tags
  metaInfo() {
    console.log(this.$route);
    const lang = this.$context.lang || 'nl';
    const links = [];
    const domain = process.env.GRIDSOME_HOST;
    // Set canonical always for current page
    links.push({
      rel: 'canonical',
      href: `${domain}${this.$route.fullPath}`,
    });
    // Set hreflang if translated page is set
    Object.entries(this.$context.translatedPages || []).forEach(
      ([key, value]) => {
        if (!value) {
          return;
        }
        links.push({
          rel: 'alternate',
          hreflang: key,
          href: `${domain}${value}`,
        });
        if (key === 'nl') {
          links.push({
            rel: 'alternate',
            hreflang: 'x-default',
            href: `${domain}${value}`,
          });
        }
      }
    );
    return {
      htmlAttrs: {
        lang,
      },
      link: links,
    };
  },
};
</script>
<style>
.navbar-margin {
  margin-top: 80px !important;
}

@media screen and (min-width: 1024px) {
  .navbar-margin {
    margin-top: 160px !important;
  }
}
</style>
