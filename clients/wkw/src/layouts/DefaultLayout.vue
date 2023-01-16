<template>
  <div>
    <AppHeader :collections="$context.navbarCollections" />
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
            <b-input :placeholder="$l('review.name')" type="name"> </b-input>
            <b-input :placeholder="$l('customer-details.email')" type="email">
            </b-input>
            <p class="control">
              <b-button
                type="is-dark-green is-shadowless is-hovered"
                :label="$l('common.subscribe')"
              />
            </p>
          </b-field>
        </div>
      </div>
    </div>
    <AppFooter
      :collections="$context.navbarCollections"
      :pages="$context.pageLinks"
    />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';

export default {
  components: { AppHeader, AppFooter, Breadcrumb },
  props: {
    showNewsletter: {
      default: true,
      type: Boolean,
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
  // Create href lang tags
  metaInfo() {
    const lang = this.$context.lang || 'nl';
    const links = [];
    const domain = process.env.GRIDSOME_HOST;
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
