import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/roboto-mono';
import {
  formatEuro,
  preconnectLinks,
  setLabelFunction,
  setStore,
} from 'pinelab-storefront';
import Buefy from 'buefy';
import VueGtag from 'vue-gtag';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  setLabelFunction(Vue, require('../labels.json'));
  Vue.filter('euro', formatEuro);
  Vue.component('Layout', Layout);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('PopupImage', PopupImage);
  Vue.use(Buefy);
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
          id: 'UA-173630600-1',
          params: {
            anonymize_ip: true,
          },
          bootstrap: false,
        },
      },
      router
    );
  }
  // Directus assets, use CMS host for local, otherwise go through netlify
  const assetHost = process.env.GRIDSOME_DIRECTUS_HOST;
  Vue.mixin({
    methods: {
      getDefaultImage: (id) => `${assetHost}/assets/${id}?key=default`,
      getSquareImage: (id) => `${assetHost}/assets/${id}?key=square`,
    },
  });
}
