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
    Object.defineProperty(Vue.prototype, '$vendure', {
      get: function () {
        // return NL or EN client for $vendure based on the current $context.lang
        return this?.$context?.lang == 'nl' ? vendureClientNl : vendureClientEn;
      },
    });
  }
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);

  // Add date filter for global use
  Vue.filter('date', function (value) {
    const date = new Date(value);
    const month = date.toLocaleString('nl-NL', { month: 'long' });
    return `${month} ${date.getFullYear()}`;
  });
}
