<template>
  <div>
    <ProgressBar color1="#23395B" color2="white" />
    <router-view :key="$route.fullPath" />
    <!--  <router-view />-->
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
<static-query>
query {
metadata {
siteName
siteDescription
}
}
</static-query>
<script>
import ProgressBar from './components/ProgressBar';
import Consent from 'pinelab-storefront/lib/components/Consent';

export default {
  components: {
    ProgressBar,
    Consent,
  },
  methods: {
    async activateAnalytics() {
      this.$gtm.enable(true);
    },
  },
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      htmlAttrs: { lang: 'nl' },
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
};
</script>
