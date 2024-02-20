<template>
  <div>
    <ProgressBar color1="#23395B" color2="white" />
    <router-view :key="$route.fullPath" />
    <!--  <router-view />-->
    <Consent
      class="consent pb-6"
      accept-text="Accepteren"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      <h4>Privacy</h4>
      <small>
        Door op "Accepteren" te klikken, stemt je ermee in dat we bepaalde
        informatie verzamelen om:
        <br />
        <br />
        <li>Gebruikersgegevens te gebruiken voor advertentiepersonalisatie</li>
        <li>Ad-gerelateerde gegevens op uw apparaat op te slaan</li>
        <li>
          Analysegegevens te verzamelen en op te slaan om onze diensten te
          verbeteren
        </li>
        <li>
          Analysegegevens te verzamelen en op te slaan om onze diensten te
          verbeteren
        </li>
        <br />
      </small>
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
      // Consent parameters: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
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
