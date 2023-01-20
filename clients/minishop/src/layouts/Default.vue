<template>
  <div>
    <ShopNavBar
      logo="/pinelab-logo.png"
      logo-alt="Pinelab logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <g-link to="https://pinelab.studio/" class="navbar-item">
        Ik wil ook een shop
      </g-link>
    </ShopNavBar>

    <div class="container is-widescreen section" style="min-height: 90vh">
      <b-button v-if="$context.back" tag="a" :href="$context.back">
        <
      </b-button>

      <br />

      <slot />
    </div>

    <footer v-if="showFooter" class="footer">
      <div class="content has-text-centered is-dark">
        Minishop demo •
        <a href="https://pinelab.studio/" target="_blank">Made by Pinelab 🌲</a>
      </div>
    </footer>
  </div>
</template>
<script>
import ShopNavBar from 'pinelab-storefront/lib/components/ShopNavbar';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';

export default {
  props: {
    showFooter: {
      default: true,
    },
  },
  components: {
    ShopNavBar,
    Breadcrumb,
  },
  mounted() {
    this.$vendure.getActiveOrder();
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
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
</style>
