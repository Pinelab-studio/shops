<template>
  <div>
    <br />
    <b-navbar class="shop-bar is-fixed-top">
      <template #brand>
        <b-navbar-item tag="div" class="is-hidden-desktop">
          <g-link :to="cartLink" class="button is-primary">
            <span class="icon is-small">
              <i :class="`mdi mdi-${cartIcon}`"></i>
            </span>
            <span>
              {{ nrOfItems }}
            </span>
          </g-link>
        </b-navbar-item>

        <b-navbar-item href="/">
          <img :src="logo" :alt="logoAlt" class="shop-logo" />
        </b-navbar-item>
      </template>
      <template #start>
        <slot />
      </template>
      <template #end>
        <b-navbar-item tag="div" class="is-hidden-touch">
          <b-tooltip :label="price" position="is-bottom">
            <g-link :to="cartLink" class="button is-primary">
              <span class="icon is-small">
                <i :class="`mdi mdi-${cartIcon}`"></i>
              </span>
              <span>
                {{ nrOfItems }}
              </span>
            </g-link>
          </b-tooltip>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>
<script>
export default {
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
    price() {
      return this.$root.$options.filters.euro(this.activeOrder?.totalWithTax);
    },
  },
  props: {
    activeOrder: {
      required: true,
    },
    cartLink: {
      type: String,
      required: true,
    },
    cartIcon: {
      type: String,
      default: 'shopping',
    },
    itemAddedText: {
      type: String,
      default: 'added',
    },
    itemAddedActionText: {
      type: String,
      default: 'Checkout now',
    },
    logo: {
      type: String,
      required: true,
    },
    logoAlt: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$emitter.on('productAdded', this.showAddedBar);
    this.$emitter.on('error', this.showError);
  },
  beforeDestroy() {
    this.$emitter.off('productAdded', this.showAddedBar);
    this.$emitter.off('error', this.showError);
  },
  methods: {
    showAddedBar(event) {
      this.$buefy.snackbar.open({
        message: `${event.quantity} ${this.itemAddedText}`,
        position: 'is-top-right',
        type: 'is-light',
        actionText: this.itemAddedActionText,
        onAction: () => {
          this.$router.push(this.cartLink);
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
.shop-logo {
  max-width: 180px;
}
</style>
