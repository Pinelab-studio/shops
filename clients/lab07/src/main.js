import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '@fontsource/raleway';
import '~/theme.scss';
import {
  formatEuro,
  preconnectLinks,
  setLabelFunction,
  setStore,
} from 'pinelab-storefront';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import VueGtag from 'vue-gtag';

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

  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('PopupImage', PopupImage);
  Vue.component('DefaultLayout', DefaultLayout);
  head.link.push(...preconnectLinks);
  setLabelFunction(Vue, require('../labels.json'));
  Vue.filter('euro', formatEuro);
  if (isClient) {
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    Vue.use(
      VueGtag,
      {
        config: {
          id: 'G-2CGDP35WGG',
          params: {
            anonymize_ip: true,
          },
        },
        bootstrap: false,
      },
      router
    );
  }
}
