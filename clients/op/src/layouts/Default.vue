<template>
  <div>
    <div class="container section mt-20 pt-0">
      <div class="has-text-centered">
        <g-link to="/"><h1 class="has-text-success my-4">OP!</h1></g-link>
        <h2 class="has-text-success mb-4">
          30 recepten voor de dreumes
          <span class="is-inline-block"> die (w)eet wat 'ie wil</span>
        </h2>
      </div>
      <slot />
    </div>

    <footer class="footer pb-4">
      <div class="container section pb-0">
        <div class="columns">
          <div id="contact" class="column">
            <h3>Contact</h3>
            <ClickableEmail />
            <br />
            <br />
            <img src="/img/groente.png" style="width: 100px" />
          </div>
          <div class="column">
            <h3>OP!</h3>
            <a href="/#about">Over het boek</a> <br />
            <a href="/#about">Over Jet</a> <br />
            <a href="/#faq">FAQ</a> <br />
            <img
              src="/img/tomaat.png"
              alt="Een gezonde tomaat!"
              class="pt-2"
              style="width: 60px"
            />
          </div>
          <div class="column">
            <a :href="$context.instagram" target="_blank" class="pr-4">
              <b-icon size="is-large" icon="instagram"></b-icon>
            </a>
            <a :href="$context.facebook" target="_blank">
              <b-icon size="is-large" icon="facebook"></b-icon>
            </a>
            <br />
            <br />
            <b-button class="is-primary" tag="a" href="#buy"
              >Koop het e-boek voor
              <b>{{ $context.product.lowestPrice | euro }}</b>
            </b-button>
            <br />
            <br />
            <img
              src="/img/mollie-dark.png"
              alt="Veilig betalen met Mollie"
              style="height: 30px; opacity: 0.6"
            />
            <br />
            <img
              src="/img/meloen.png"
              alt="Watermeloen"
              class="pt-4 ml-6"
              style="width: 40px"
            />
          </div>
        </div>

        <br />
        <br />
        <br />
        <div class="content has-text-centered is-dark has-text-grey-light">
          OP! • Jet van Nieuwkerk •
          <a
            href="https://pinelab.studio/"
            target="_blank"
            class="has-text-grey-light"
            >Website gemaakt met
            <img src="/img/tomaat.png" style="width: 25px" class="px-1" />
            door Pinelab</a
          >
        </div>
      </div>
    </footer>

    <Consent
      accept-text="Ja, dat is goed"
      decline-text="Nee"
      thank-you-message="Bedankt!"
      v-on:approved="activateAnalytics()"
    >
      <br />
      <h4>Cookies</h4>
      Vind je het goed dat we geanonimiseerde data naar Google Analytics sturen,
      om het gebruik van de website te meten?
      <br />
    </Consent>
  </div>
</template>
<script>
import { bootstrap } from 'vue-gtag';
import Consent from 'pinelab-storefront/lib/components/Consent';

export default {
  components: {
    Consent,
  },
  methods: {
    async activateAnalytics() {
      await bootstrap();
      console.log('ga approved');
    },
  },
};
</script>
<style></style>
