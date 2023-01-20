import Buefy from 'buefy';
import {
  formatEuro,
  preconnectLinks,
  setLabelFunction,
  setStore,
} from 'pinelab-storefront';
import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/work-sans';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import VueGtag from 'vue-gtag';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  setLabelFunction(Vue, require('../labels.json'));
  Vue.filter('euro', formatEuro);
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
          id: 'G-HWPW53KXT8',
          params: {
            anonymize_ip: true,
          },
        },
      },
      router
    );
  }
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('Layout', Layout);
  Vue.component('PopupImage', PopupImage);

  // Directus assets, use CMS host for local, otherwise go through netlify
  const assetHost =
    process.env.NODE_ENV === 'production'
      ? ''
      : process.env.GRIDSOME_DIRECTUS_HOST;
  Vue.mixin({
    methods: {
      getDefaultImage: (id) => `${assetHost}/assets/${id}?key=default`,
      getSquareImage: (id) => `${assetHost}/assets/${id}?key=square`,
    },
  });
}
