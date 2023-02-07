<template>
  <Layout>
    <section class="has-text-centered">
      <b-button class="is-danger" tag="a" href="#buy"
        >Koop het e-boek voor
        <b>{{ $context.product.lowestPrice | euro }}</b>
      </b-button>
      <br />
      <br />
      <br />
    </section>

    <section id="book">
      <br />
      <div class="columns">
        <div class="column is-6">
          <PopupImage
            :small="$context.product.featuredAsset.preview"
            :alt="$context.product.name"
            :large="$context.product.featuredAsset.preview"
            class="mb-4"
          />
          <div class="columns is-mobile">
            <div class="column" v-for="asset of $context.product.assets">
              <PopupImage
                :small="asset.thumbnail"
                :alt="$context.product.name"
                :large="asset.preview"
                class="mb-4"
              />
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="description">
            <div v-html="$context.product.description"></div>
          </div>

          <div id="buy">
            <div class="has-text-centered"></div>
            <h2 class="has-text-danger has-text-weight-bold">
              Koop Op! hier voor
              {{ $context.product.lowestPrice | euro }}
              <img
                src="/img/wortel.png"
                alt="Wortel"
                style="width: 150px; box-shadow: none; padding-left: 20px"
              />
            </h2>
            <p>Betaal online en ontvang het boek direct in je email.</p>
            <form v-on:submit="buy($event)">
              <div class="columns">
                <div class="column">
                  <b-field
                    grouped
                    label="Emailadres"
                    label-position="on-border"
                  >
                    <b-input
                      type="email"
                      v-model="emailAddress"
                      id="email"
                      name="email"
                      autocomplete="on"
                      expanded
                      required
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-button
                    tag="button"
                    native-type="submit"
                    type="is-danger"
                    :loading="loading"
                    >Koop het boek
                  </b-button>

                  <b-tooltip
                    label="Je betaalt veilig met iDeal"
                    position="is-bottom"
                  >
                    <img
                      src="/img/ideal.svg"
                      alt="Veilig betalen met iDeal"
                      class="is-shadowless ml-4"
                      style="height: 40px; opacity: 0.5"
                    />
                  </b-tooltip>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="mt-6">
      <!--            <img src="/img/over-jet.png" alt="Over Jet logo" style="width: 200px;"/>
      <br/>-->
      <h2 class="has-text-primary is-size-5">Over Jet</h2>

      Jet van Nieuwkerk (1989) is moeder van Frenkie, presentatrice en
      foodjournalist. Ze schreef drie boeken: Het Boek van Jet, Tips van Jet en
      Uit huis met Jet. Ze presenteerde de driedelige serie Niet gezond meer
      voor NPO3, het programma Foodmakers op RTL4, is te zien in Wat eten we
      vandaag van 24Kitchen en kookte voor het dagelijkse programma Wat Eten We
      op Net 5. Op haar Instagram
      <a :href="$context.instagram" target="_blank"> TipvanJet</a> en website
      <a href="https://tipvanjet.nl" target="_blank">www.tipvanjet.nl</a> deelt
      zij tips om het leven leuker en makkelijker te maken, sinds Frenkie is
      geboren dus ook vaak voor andere ouders.
    </section>

    <section id="faq" class="mt-6">
      <h2 class="has-text-primary is-size-5">
        Prangende vragen en verlossende antwoorden
      </h2>
      <p>
        <b>Staan er ook vegetarische recepten in het e-book?</b><br />
        80% procent van de recepten is vegetarisch.
      </p>
      <p>
        <b>Kun je het e-book ook ruilen?</b><br />
        Nee, dat is niet mogelijk, gekocht is gekocht.
      </p>
      <p>
        <b>Wat als ik het e-book heb gekocht, maar geen e-mail heb ontvangen?</b
        ><br />
        Dat zou vervelend zijn. Check ook altijd even je spam en mail anders
        naar
        <ClickableEmail />
      </p>
      <p>
        <b>Is het boek ook in printversie te krijgen?</b><br />
        Tot nu toe is het boek alleen te downloaden.
      </p>
      <p>
        <b
          >Ik zie een spelfoutje en ik kan niet slapen voordat ik dat gemeld
          heb, wat moet ik doen?</b
        ><br />
        O jee, dat kan natuurlijk gebeuren. Laat je horen via
        <ClickableEmail />
      </p>
      <p>
        <b>Ik heb nog een vraag, maar die staat hier niet tussen.</b><br />
        Mail dan naar
        <ClickableEmail />
      </p>
      <p>
        <b> Hoe sla ik het boek op?</b>
        <br />
        Je kunt het boek op elk apparaat downloaden (telefoon, computer,
        tablet), maar ik vind het het handigst om het bestand op te slaan in je
        ‘Boeken’, dat is een standaard app die op je apparaat staat, zodat je
        het boek altijd offline kunt lezen en snel kunt terugvinden.
      </p>
    </section>
  </Layout>
</template>
<script>
import { getMetaInfo } from 'pinelab-storefront';

export default {
  data() {
    return {
      loading: false,
      emailAddress: undefined,
      orderPreparation: undefined,
    };
  },
  methods: {
    async buy(e) {
      e.preventDefault();
      try {
        this.loading = true;
        await this.prepareOrder();
        const redirect = await this.$vendure.createMolliePaymentIntent(
          'mollie-payment-op'
        );
        this.loading = false;
        window.location.replace(redirect);
      } catch (e) {
        this.showError(`Er is iets misgegaan, neem contact met ons op...`);
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    async prepareOrder() {
      await this.$vendure.getActiveOrder();
      if (this.$store?.activeOrder) {
        await this.$vendure.removeAllOrderLines();
        console.log('Removed previous orderlines');
      }
      // If no active order or no items
      await this.$vendure.addProductToCart(
        this.$context.product.variants[0].id,
        1
      );
      console.log('Added 1 ebook to cart');
      await this.$vendure.setCustomerForOrder({
        firstName: this.emailAddress,
        lastName: 'e-book',
        emailAddress: this.emailAddress,
      });
      console.log(`Added customer`);
      await this.$vendure.setOrderShippingAddress({
        fullName: this.emailAddress,
        streetLine1: 'E-book',
        city: 'Amsterdam',
        postalCode: '1234AB',
        countryCode: 'nl',
      });
      console.log('Added address');
    },
    showError(message) {
      this.$buefy.snackbar.open({
        duration: 5000,
        message,
        type: 'is-danger',
        position: 'is-bottom',
      });
    },
  },
  metaInfo() {
    return getMetaInfo(this.$context.product, 'https://ophetboek.nl/');
  },
};
</script>
<style></style>
