import Buefy from 'buefy';
import Layout from '~/layouts/Default.vue';
import '~/theme.scss';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/500.css';
import ClickableEmail from './components/ClickableEmail';
import {
  formatEuro,
  preconnectLinks,
  setStore,
  setLabelFunction,
} from 'pinelab-storefront';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import VueGtag from 'vue-gtag';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);
  Vue.component('Layout', Layout);
  Vue.component('ClickableEmail', ClickableEmail);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('PopupImage', PopupImage);
  Vue.component('Layout', Layout);
  head.link.push(...preconnectLinks);
  Vue.filter('euro', formatEuro);
  setLabelFunction(Vue, require('../labels.json'));
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
          id: 'G-S9BE2BG5NQ',
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
