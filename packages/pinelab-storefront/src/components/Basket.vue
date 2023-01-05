<template>
  <span>
    <!-- Simple slot without icon  -->
    <slot
      :nrOfItems="nrOfItems"
      :open="
        () => {
          this.sideBasketOpen = true;
        }
      "
    />

    <!-------------------------   Sidemenu ----------------------->
    <ClientOnly>
      <b-sidebar
        type="is-white"
        :fullheight="true"
        :fullwidth="false"
        :overlay="true"
        :right="true"
        v-model="sideBasketOpen"
      >
        <div class="p-2" id="side-basket">
          <div class="has-text-centered mb-2">
            <h3>{{ $l('basket.title') }}</h3>
          </div>

          <div v-if="lines.length > 5">
            <br />
            <b-button
              type="is-outlined is-fullwidth mb-2"
              icon-left="basket"
              @click="
                $router.push(cartUrl);
                sideBasketOpen = false;
              "
            >
              {{ $l('basket.go-to-cart') }}
            </b-button>
            <b-button
              type="is-fullwidth"
              icon-left="run-fast"
              @click="
                $router.push(cartUrl);
                sideBasketOpen = false;
              "
            >
              {{ $l('basket.go-to-checkout') }}
            </b-button>
            <br />
          </div>

          <div class="is-size-7">
            <table class="table">
              <tbody>
                <template v-for="line of lines">
                  <tr>
                    <td class="px-0" style="width: 50px">
                      <img
                        :src="line.featuredAsset.thumbnail"
                        class="is-rounded"
                      />
                    </td>
                    <td>
                      <p class="mb-0">{{ line.productVariant.name }}</p>
                      {{ line.quantity }} x
                      {{ line.productVariant.priceWithTax | euro }}
                    </td>
                    <td>
                      <b-icon
                        class="is-clickable"
                        size="is-small"
                        icon="close"
                        @click.native="$vendure.adjustOrderLine(line.id, 0)"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <template v-if="lines.length > 0">
            <table style="width: 100%">
              <tr>
                <td>{{ $l('basket.shipping-cost') }}</td>
                <td class="has-text-right">
                  <strong>{{ order.shippingWithTax | euro }}</strong>
                </td>
              </tr>
              <tr>
                <td>{{ $l('basket.total') }}</td>
                <td class="has-text-right">
                  <strong>{{ order.totalWithTax | euro }}</strong>
                </td>
              </tr>
            </table>
            <br />
            <b-button
              type="is-outlined is-fullwidth mb-2"
              icon-left="basket"
              @click="
                $router.push(cartUrl);
                sideBasketOpen = false;
              "
            >
              {{ $l('basket.go-to-cart') }}
            </b-button>
            <b-button
              type="is-fullwidth"
              icon-left="run-fast"
              @click="
                $router.push(checkoutUrl);
                sideBasketOpen = false;
              "
            >
              {{ $l('basket.go-to-checkout') }}
            </b-button>
          </template>
          <template v-else> {{ $l('basket.empty-cart') }}</template>
        </div>
      </b-sidebar>
    </ClientOnly>
  </span>
</template>
<script>
export default {
  props: {
    cartUrl: {
      type: [String],
      required: true,
    },
    checkoutUrl: {
      type: [String],
      required: true,
    },
  },
  data() {
    return {
      sideBasketOpen: false,
    };
  },
  async mounted() {
    this.$emitter.on('productAdded', this.showNotificationBar);
    this.$emitter.on('error', this.showError);
  },
  beforeDestroy() {
    this.$emitter.off('productAdded', this.showNotificationBar);
    this.$emitter.off('error', this.showError);
  },
  computed: {
    nrOfItems() {
      if (this.$store?.activeOrder?.lines?.length === 0) {
        return 0;
      }
      return (
        this.$store?.activeOrder?.lines
          ?.map((l) => l.quantity)
          ?.reduce((quantity1, quantity2) => quantity1 + quantity2) || 0
      );
    },
    lines() {
      return this.$store?.activeOrder?.lines || [];
    },
    order() {
      return this.$store?.activeOrder || {};
    },
  },
  methods: {
    showNotificationBar(event) {
      const message =
        event.quantity > 0
          ? `${event.quantity} ${this.$l(`basket.added`)}`
          : `${event.quantity * -1} ${this.$l(`basket.removed`)}`;
      this.$buefy.snackbar.open({
        message,
        position: 'is-top-right',
        type: 'is-light',
        actionText: this.$l(`basket.go-to-cart`),
        pauseOnHover: true,
        duration: 5000,
        onAction: () => {
          this.$router.push(this.cartUrl);
        },
      });
    },
    showError(e) {
      console.error(e);
      let label = this.$l(`error.${e.errorCode}`);
      label = label === `error.${e.errorCode}` ? undefined : label;
      this.$buefy.toast.open({
        message: label || e.message,
        duration: 5000,
        position: 'is-bottom',
        type: 'is-danger',
      });
    },
  },
};
</script>
<style>
#side-basket img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
