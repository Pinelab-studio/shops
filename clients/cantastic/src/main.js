import Buefy from 'buefy';
import DefaultLayout from '~/layouts/DefaultLayout.vue';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/400.css';
import '@fontsource/open-sans';
import '~/theme.scss';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import {
  preconnectLinks,
  setLabelFunction,
  setStore,
} from 'pinelab-storefront';
import QuantityInput from 'pinelab-storefront/lib/components/QuantityInput';
import PopupImage from 'pinelab-storefront/lib/components/PopupImage';
import VueGtm from '@gtm-support/vue2-gtm';

export default function (Vue, { router, head, isClient }) {
  head.link.push(...preconnectLinks);
  Vue.use(Buefy);
  Vue.component('QuantityInput', QuantityInput);
  Vue.component('DefaultLayout', DefaultLayout);
  Vue.component('PopupImage', PopupImage);
  Vue.component('ProductCard', ProductCard);
  Vue.component('CategoryCard', CategoryCard);
  if (isClient) {
    Vue.use(VueGtm, {
      id: 'GTM-MMK8RGTW', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
      defer: true, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
      compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
      enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
      loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
      vueRouter: router, // Pass the router instance to automatically sync with router (optional)
      trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    });

    Vue.use(
      VueGtag,
      {
        config: {
          id: 'G-HSHBS7YZDM',
          params: {
            anonymize_ip: true,
          },
        },
        bootstrap: false,
      },
      router
    );
    setStore(
      Vue,
      process.env.GRIDSOME_VENDURE_API,
      process.env.GRIDSOME_VENDURE_TOKEN
    );
    router.beforeEach((to, from, next) => {
      Vue.prototype.$emitter.emit('loading');
      next();
    });
    router.afterEach((to, from) => {
      Vue.prototype.$emitter.emit('finishedLoading');
    });
    if (process.env.GRIDSOME_ENABLE_MOBILE_CONSOLE) {
      require('outfront').default();
      console.log('OutfrontJS mobile logging enabled');
    }
  }
  setLabelFunction(Vue, require('../labels.json'));
  Vue.mixin({
    methods: {
      maybeThumbnail(asset) {
        return asset?.thumbnail;
      },
      maybePreview(asset) {
        return asset?.preview;
      },
    },
  });
  // Get image by ID from directus
  Vue.mixin({
    methods: {
      getDefaultImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=default`,
      getSquareImage: (id) =>
        `${process.env.GRIDSOME_DIRECTUS_HOST}/assets/${id}?key=square`,
    },
  });
  Vue.filter('euro', function (value) {
    if (!value) {
      value = 0;
    }
    const currencyString =
      value < 0
        ? `-${Math.abs(value / 100)
            .toFixed(2)
            .replace('.', ',')}`
        : `${(value / 100).toFixed(2).replace('.', ',')}`;
    /*    if (currencyString.endsWith('00')) {
      return currencyString.replace(new RegExp('00$'), '-');
    }*/
    return currencyString;
  });
  Vue.filter('formatDate', function (date) {
    if (date) {
      return new Date(date).toLocaleDateString('nl', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  });
}
