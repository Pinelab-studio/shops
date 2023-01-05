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
  setStore,
} from 'pinelab-storefront';

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
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
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
