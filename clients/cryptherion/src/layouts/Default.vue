<template>
  <div>
    <div v-if="$context.global.banner">
      <p class="banner has-text-centered has-background-success has-text-white">
        {{ $context.global.banner }}
      </p>
      <br />
      <div class="is-hidden-desktop">
        <br />
      </div>
    </div>

    <ShopNavBar
      logo="/img/cryptherion-logo-black.svg"
      logo-alt="Cryptherion logo"
      cart-link="/cart/"
      cart-icon="basket"
      :activeOrder="activeOrder"
      itemAddedActionText="Naar winkelmand"
      itemAddedText="toegevoegd"
    >
      <template v-for="collection of $context.collections">
        <!-- collections with children-->
        <b-navbar-dropdown
          v-if="collection.children"
          collapsible
          :label="collection.name"
        >
          <b-navbar-item
            v-for="subCollection of collection.children"
            :key="subCollection.slug"
            :href="`/categorie/${subCollection.slug}`"
          >
            {{ subCollection.name }}
          </b-navbar-item>
        </b-navbar-dropdown>
        <!-- flat no-children collections -->
        <g-link
          v-else
          :to="`/categorie/${collection.slug}`"
          :key="collection.slug"
          class="navbar-item"
        >
          {{ collection.name }}
        </g-link>
      </template>
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <b-button v-if="$context.back" tag="a" :href="$context.back">
        <
      </b-button>

      <template v-if="$context.breadcrumb">
        <Breadcrumb :crumbs="$context.breadcrumb" />
        <br />
      </template>

      <transition name="fade" appear>
        <main>
          <slot />
        </main>
      </transition>
    </div>

    <footer class="footer">
      <div class="columns">
        <div class="column" v-for="collection of $context.collections">
          <g-link :to="`/categorie/${collection.slug}`">
            <h4>{{ collection.name }}</h4>
          </g-link>
          <g-link
            v-for="childCollection of collection.children"
            :to="`/categorie/${childCollection.slug}`"
            :key="childCollection.slug"
          >
            {{ childCollection.name }}<br />
          </g-link>
        </div>
        <div class="column">
          <h4 class="mb-2">Betaalmogelijkheden</h4>
          <span class="payment-methods">
            <img src="/img/payment/bitcoin.png" alt="bitcoin" /><img
              src="/img/payment/bitcoincash.svg"
              alt="bitcoincash"
            /><img src="/img/payment/dai.svg" alt="dai" /><img
              src="/img/payment/dogecoin.png"
              alt="dogecoin"
            />
            <br />
            <img src="/img/payment/ethereum.png" alt="ethereum" /><img
              src="/img/payment/litecoin.png"
              alt="litecoin"
            />
            <br />
            <img src="/img/payment/ideal.svg" alt="ideal" /><img
              src="/img/payment/maestro.svg"
              alt="maestro"
            /><img src="/img/payment/mastercard.svg" alt="mastercard" />
            <br />
            <img src="/img/payment/visa.svg" alt="visa" /><img
              src="/img/payment/sofort.svg"
              alt="sofort"
            /><img src="/img/payment/bancontact.svg" alt="bancontact" />
          </span>
        </div>
      </div>
      <section id="contact" class="content has-text-centered is-dark">
        <span class="line">
          <b-icon icon="phone" size="is-small" type="is-success"></b-icon>
          <a :href="`tel:${$context.global.telefoon}`">{{
            $context.global.telefoon
          }}</a>
        </span>

        <span class="line">
          <b-icon icon="email" size="is-small" type="is-success"></b-icon>
          <a :href="`mailto:${$context.global.email}`">{{
            $context.global.email
          }}</a>
        </span>

        <span class="line">
          <b-icon icon="map-marker" size="is-small" type="is-success"></b-icon>
          {{ $context.global.adres }}
        </span>

        <span class="line">
          <b-icon
            icon="account-check"
            size="is-small"
            type="is-success"
          ></b-icon>
          <g-link to="/privacy-beleid/">Privacy beleid</g-link>
        </span>
        <span class="line">
          <b-icon
            icon="file-document"
            size="is-small"
            type="is-success"
          ></b-icon>
          <g-link to="/algemene-voorwaarden/">Algemene voorwaarden</g-link>
        </span>
      </section>
      <div class="content has-text-centered is-dark has-text-grey">
        Cryptherion.io •
        <a href="https://pinelab.studio/" class="has-text-grey" target="_blank"
          >Made by Pinelab 🌲</a
        >
      </div>
    </footer>

    <Consent
      accept-text="Ja, accepteer cookies"
      decline-text="Nee"
      v-on:approved="activate()"
      class="p-6"
    >
      <p class="mt-3">
        Vind je het goed dat we geanonimiseerde data naar Google Analytics
        sturen om onze webshop te verbeteren?
      </p>
    </Consent>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront/lib/components/ShopNavbar';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Consent from 'pinelab-storefront/lib/components/Consent';
import { bootstrap } from 'vue-gtag';

export default {
  props: {
    showFooter: {
      default: true,
    },
  },
  components: {
    ShopNavBar,
    Breadcrumb,
    Consent,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
  methods: {
    activate() {
      console.log('Cookies approved');
      bootstrap();
    },
  },
};
</script>
<style>
.footer a {
  color: white;
}

.footer a:hover {
  color: white;
}

.product-card-container > p {
  font-size: 1.5rem;
  font-style: italic;
}

.navbar {
  border-bottom: 1px solid #e1e1e1;
}

#contact .icon {
  padding-left: 20px;
  padding-right: 15px;
}

span.line {
  display: inline-block;
}

.banner {
  width: 100%;
  margin-top: 56px;
  position: fixed;
  z-index: 2;
  font-weight: bold;
}
</style>
