import Buefy from 'buefy';
import '~/theme.scss';
import { formatEuro, preconnectLinks, setStore } from 'pinelab-storefront';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import '@fontsource/poppins';
import Basket from 'pinelab-storefront/lib/components/Basket';
import DefaultLayout from '/src/layouts/DefaultLayout.vue';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('PopupImage', PopupImage);
  Vue.component('Basket', Basket);
  Vue.component('DefaultLayout', DefaultLayout);
  if (isClient) {
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
  }
  Vue.filter('euro', formatEuro);
}
