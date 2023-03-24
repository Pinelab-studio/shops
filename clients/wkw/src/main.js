import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '~/theme.scss';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import '@fontsource/poppins';
import {
  formatEuro,
  preconnectLinks,
  createLabelFunction,
  VendureClient,
} from 'pinelab-storefront';
import mitt from 'mitt';
import VueGtag from 'vue-gtag';
import VueDisqus from 'vue-disqus';

export default function (Vue, { router, head, isClient }) {
  // Get image by ID from directus
  Vue.mixin({
    methods: {
      getDefaultImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=default`,
      getSquareImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=square`,
    },
  });
  head.link.push(...preconnectLinks);
  Vue.prototype.$l = createLabelFunction([
    require('../labels/nl.json'),
    require('../labels/en.json'),
  ]);
  Vue.filter('euro', formatEuro);
  if (isClient) {
    // Set clients and store
    const apiBase = process.env.GRIDSOME_VENDURE_API;
    const channelToken = process.env.GRIDSOME_VENDURE_TOKEN;
    const store = Vue.observable({
      activeOrder: undefined,
    });
    Vue.prototype.$store = store;
    Vue.prototype.$emitter = mitt();
    // Create both EN and NL clients
    const vendureClientEn = new VendureClient(
      store,
      `${apiBase}?languageCode=en`,
      channelToken
    );
    const vendureClientNl = new VendureClient(
      store,
      `${apiBase}?languageCode=nl`,
      channelToken
    );
    // Create a getter function that returns an NL or EN client based on the $context.lang when $vendure is used
    Object.defineProperty(Vue.prototype, '$vendure', {
      get: function () {
        return this?.$context?.lang == 'nl' ? vendureClientNl : vendureClientEn;
      },
    });
    // Analytics
    Vue.use(
      VueGtag,
      {
        config: {
          id: 'UA-57308319-7',
          params: {
            anonymize_ip: true,
          },
        },
        includes: [{ id: 'AW-869905982' }],
        bootstrap: false,
      },
      router
    );
  }
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
  Vue.use(VueDisqus);

  // Add date filter for global use
  Vue.filter('date', function (value) {
    const date = new Date(value);
    const month = date.toLocaleString('nl-NL', { month: 'long' });
    return `${month} ${date.getFullYear()}`;
  });
}
