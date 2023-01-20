<template>
  <footer id="footer" class="footer pb-0 has-text-black">
    <div class="container is-widescreen section p-5">
      <div class="columns is-centered" style="border-bottom: 1px solid black">
        <!--CATEGORIES COLUMN-->

        <div class="column is-3">
          <h4 class="mb-4 is-underlined">Categories</h4>
          <template v-for="category in $context.categories">
            <g-link :to="`/category/${category.slug}`" class="navbar-item">
              {{ category.name }}
            </g-link>
          </template>
        </div>

        <!--QUICK LINKS COLUMN-->

        <div class="column is-3">
          <h4 class="mb-4 is-underlined">Quick links</h4>
          <g-link to="/" class="navbar-item">About Wavkits</g-link>
          <g-link to="/" class="navbar-item">Licensing</g-link>
          <g-link to="/" class="navbar-item">Softwares & Formats</g-link>
          <g-link to="/" class="navbar-item">Blog</g-link>
          <g-link to="/" class="navbar-item">Newsletter</g-link>
          <g-link to="/" class="navbar-item">Privacy Policy</g-link>
          <g-link to="/" class="navbar-item">Terms & Conditions</g-link>
        </div>

        <!--HELP COLUMN-->

        <div class="column is-3">
          <h4 class="mb-4 is-underlined">Help</h4>
          <g-link to="/" class="navbar-item">FAQ</g-link>
          <g-link to="/" class="navbar-item">Contact Us</g-link>
          <g-link to="/" class="navbar-item">Help Center</g-link>
          <g-link to="/" class="navbar-item">Refund Policy</g-link>
          <g-link to="/" class="navbar-item">How to buy</g-link>
        </div>

        <!--ABOUT COLUMN-->

        <div class="column">
          <a class="mb-4 is-inline-block">
            <img
              src="/img/wavkits-black.png"
              width="130px"
              alt="wavkits.com logo"
              id="logo"
              class="cursor"
            />
          </a>
          <p class="has-text-black mb-6">
            Everything you need for that next song.
          </p>
        </div>
      </div>

      <!--SOCIAL / MADE BY COLUMN-->
      <div class="columns is-flex is-vcentered">
        <div class="column">
          <g-link
            class="mdi mdi-facebook mdi-24px has-text-black mr-1"
          ></g-link>
          <g-link
            class="mdi mdi-instagram mdi-24px has-text-black mx-1"
          ></g-link>
          <g-link
            class="mdi mdi-facebook mdi-24px has-text-black mx-1"
          ></g-link>
          <g-link class="mdi mdi-youtube mdi-24px has-text-black mx-1"></g-link>
          <g-link
            class="mdi mdi-soundcloud mdi-24px has-text-black mx-1"
          ></g-link>
        </div>
        <div class="column has-text-right">
          <g-link
            to="https://instagram.com/roelobeats/"
            class="has-text-black is-bold"
            >Made with passion by <b><u>Roelobeats</u></b></g-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: ['category'],
};
</script>
