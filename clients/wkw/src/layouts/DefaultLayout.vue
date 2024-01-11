<template>
  <div>
    <AppHeader
      :collections="$context.navbarCollections"
      :key="$route.fullPath"
    />

    <div class="container is-widescreen section navbar-margin pb-6">
      <!-- Wholesale banner -->
      <div
        v-if="$context.lang === 'nl'"
        class="notification is-primary p-1 m-0 mb-4 has-text-centered"
      >
        <p class="has-text-white banner-text">
          Hovenier of winkeleigenaar?
          <a href="/kan-ik-korting-krijgen-als-winkeleigenaar/"
            >Meld je hier aan</a
          >
        </p>
      </div>

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
      <NewsletterSignup :text="$context.common.nieuwsbrief" />
    </div>
    <AppFooter
      :collections="$context.navbarCollections"
      :pages="$context.pageLinks"
    />
    <Consent
      class="consent pb-6"
      accept-text="Ja, dat is goed"
      decline-text="Nee, ik wurm me er liever omheen"
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
import NewsletterSignup from '@/components/NewsletterSignup.vue';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Consent from 'pinelab-storefront/lib/components/Consent';
import { bootstrap } from 'vue-gtag';

export default {
  components: { AppHeader, AppFooter, Breadcrumb, Consent, NewsletterSignup },
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
    margin-top: 158px !important;
  }
}
</style>
