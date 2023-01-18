<template>
  <div>
    <ShopNavBar
      logo="/img/bendeboef-logo.svg"
      logo-alt="Ben de Boef logo"
      cart-link="/cart/"
      :activeOrder="activeOrder"
    >
      <g-link
        v-for="link of links"
        :to="link.url"
        :key="link.url"
        class="navbar-item"
      >
        {{ link.name }}
      </g-link>
    </ShopNavBar>

    <slot name="hero" />

    <div class="container is-widescreen section" style="min-height: 90vh">
      <Breadcrumb v-if="$context.breadcrumb" :crumbs="$context.breadcrumb" />

      <br />

      <slot name="content" />
    </div>

    <footer v-if="showFooter" class="footer">
      <div id="#contact" class="content has-text-centered is-dark">
        <a :href="$context.global.instagram" target="_blank">
          <b-icon icon="instagram"></b-icon>
        </a>
        • Ben de Boef Tattoo's •
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
  metaInfo() {
    const desc =
      'Ben is an artist and tattoo artist from Amsterdam. Tattooing with renowned artists like Yoji Harada † and has tattood at the well known "Schiffmacher en Veldhoen".';
    return {
      title: this.$context.global.title,
      meta: [
        { name: 'description', content: desc },
        { name: 'og:title', content: this.$context.global.title },
        { name: 'og:description', content: desc },
        {
          name: 'og:image',
          content: 'https://bendeboef.com/img/social-ben.jpg',
        },
      ],
    };
  },
  data() {
    return {
      links: [
        {
          name: 'Shop',
          url: '/shop/',
        },
        {
          name: 'Tattoos',
          url: '/tattoos/',
        },
        {
          name: 'Bio',
          url: '/bio/',
        },
        {
          name: 'Contact',
          url: '/contact/',
        },
      ],
    };
  },
  components: {
    ShopNavBar,
    Breadcrumb,
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
  mounted() {
    this.$vendure.getActiveOrder();
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
