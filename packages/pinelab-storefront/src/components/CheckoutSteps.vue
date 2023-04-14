<template>
  <ClientOnly>
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="false"
      label-position="bottom"
      mobile-mode="compact"
    >
      <!--- CUSTOMER DETAILS -------------------------------------->
      <b-step-item
        step="0"
        :label="$l('customer-details.title')"
        icon="account"
        :clickable="true"
      >
        <br />
        <CustomerDetailsForm
          :available-countries="availableCountries"
          :vendure="vendure"
          @back="$router.go(-1)"
          @submit="gotToShipping()"
        ></CustomerDetailsForm>
      </b-step-item>

      <!--- SHIPPING -------------------------------------->
      <b-step-item
        step="1"
        :label="$l('shipping.step-title')"
        icon="truck"
        :clickable="false"
      >
        <div class="columns is-mobile">
          <div class="column">
            <b-button
              class="is-outlined"
              aria-label="back to customer details"
              :disable="hasShippingSelected"
              @click="goToStep(0)"
            >
              &lt;
            </b-button>
          </div>
          <div class="column has-text-right">
            <b-button
              aria-label="submit shippingmethod"
              :disable="hasShippingSelected"
              @click="goToStep(2)"
            >
              {{ $l('shipping.submit') }}
            </b-button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <h3>{{ $l('shipping.page-title') }}</h3>
            <SelectShippingForm
              :vendure="vendure"
              :store="store"
              :shipping-methods="shippingMethods"
              :pickup-points-enabled="true"
            />
          </div>
          <div class="column is-offset-1">
            <OrderSummary class="mb-5" :order="activeOrder">
              <template #middle>
                <CouponInput
                  class="pt-2"
                  :vendure="vendure"
                  :applied-coupons="activeOrder.couponCodes"
                />
              </template>
              <template #bottom>
                <br />
                <b-button
                  class="is-fullwidth"
                  aria-label="submit shippingmethod"
                  :disable="hasShippingSelected"
                  @click="goToStep(2)"
                >
                  {{ $l('shipping.submit') }}
                </b-button>
              </template>
            </OrderSummary>
            <slot name="orderSummaryFooter" />
          </div>
        </div>
      </b-step-item>

      <!--- CHECKUP -------------------------------------->
      <b-step-item
        step="2"
        :label="$l('checkup.title')"
        icon="playlist-check"
        :clickable="false"
        disabled
      >
        <div class="columns is-mobile">
          <div class="column">
            <b-button
              class="is-outlined"
              aria-label="back to shipping"
              :disable="hasShippingSelected"
              @click="goToStep(1)"
            >
              &lt;
            </b-button>
          </div>
          <div class="column has-text-right">
            <b-button
              aria-label="go to payment"
              :disable="hasShippingSelected"
              @click="choosePayment()"
            >
              {{ $l('checkup.pay') }}
            </b-button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-8">
            <div v-if="$slots.aboveCheckup" class="columns">
              <div class="column">
                <slot name="aboveCheckup" />
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <AddressDisplay
                  :title="$l('checkup.shipping-address')"
                  :address="activeOrder.shippingAddress || {}"
                  :email="
                    activeOrder.customer
                      ? activeOrder.customer.emailAddress
                      : undefined
                  "
                />
              </div>
              <div
                class="column"
                v-if="
                  activeOrder.billingAddress &&
                  activeOrder.billingAddress.postalCode
                "
              >
                <AddressDisplay
                  :title="$l('checkup.billing-address')"
                  :address="activeOrder.billingAddress || {}"
                />
              </div>
            </div>

            <h4>{{ $l('checkup.items') }}</h4>
            <div class="scrollable-product-overview">
              <CartItemsTable disabled :active-order="activeOrder" />
            </div>
          </div>
          <div class="column is-4">
            <OrderSummary class="mb-5" :order="activeOrder">
              <template #bottom>
                <br />
                <b-button
                  class="is-fullwidth"
                  aria-label="go to payment"
                  :disable="hasShippingSelected"
                  @click="choosePayment()"
                >
                  {{ $l('checkup.pay') }}
                </b-button>
                <br />
                <small>{{ $l('checkup.disclaimer') }}</small>
              </template>
            </OrderSummary>
            <slot name="orderSummaryFooter" />
          </div>
        </div>
      </b-step-item>

      <!-------------------- PAYMENT ---------------------------->
      <b-step-item
        v-if="paymentMethods.length > 1"
        step="3"
        :label="$l('payment.title')"
        icon="currency-eur"
        :clickable="false"
        disabled
      >
        <div class="columns">
          <div class="column is-offset-one-quarter">
            <br />
            <h5>{{ $l('payment.choose') }}</h5>
            <br />
            <section>
              <b-field>
                <b-radio v-model="selectedPaymentMethod" native-value="mollie">
                  <slot name="mollie">Mollie (iDeal, Creditcard)</slot>
                </b-radio>
              </b-field>
              <b-field>
                <b-radio
                  v-model="selectedPaymentMethod"
                  native-value="coinbase"
                >
                  <slot name="coinbase"
                    >Coinbase (Bitcoin, Ethereum, Litecoin and more)
                  </slot>
                </b-radio>
              </b-field>
            </section>
            <br />
            <p>
              {{ $l('order-summary.total') }}:
              <strong>{{ activeOrder.totalWithTax | euro }}</strong>
            </p>
            <br />
            <div class="columns is-mobile">
              <div class="column">
                <a @click="goToStep(2)" class="button is-outlined"><</a>
              </div>
              <div class="column">
                <b-button
                  type="is-primary"
                  icon-left="currency-eur"
                  :loading="loadingPayment"
                  @click="startPayment()"
                >
                  {{ $l('checkup.pay') }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </b-step-item>

      <!--- Order -------------------------------------->
      <b-step-item
        step="4"
        :label="$l('finished.title')"
        icon="check"
        :clickable="false"
        disabled
      >
      </b-step-item>
    </b-steps>
  </ClientOnly>
</template>
<script>
import CustomerDetailsForm from '../components/CustomerDetailsForm';
import SelectShippingForm from '../components/SelectShippingForm';
import CouponInput from '../components/CouponInput';
import OrderSummary from '../components/OrderSummary';
import AddressDisplay from '../components/AddressDisplay';
import CartItemsTable from '../components/CartItemsTable';
import { startPayment } from '../util/payment.util';
import { VendureClient } from '../vendure/vendure.client';
import { Store } from '../vendure/types';

export default {
  props: {
    vendure: {
      type: VendureClient,
      required: true,
    },
    emitter: {
      type: Object,
      required: true,
    },
    store: {
      type: [Store, Object],
      required: true,
    },
    availableCountries: {
      type: Array,
      required: true,
    },
    paymentMethods: {
      type: Array,
      validator(values) {
        // The values must match one of these strings
        return values.every((value) => ['mollie', 'coinbase'].includes(value));
      },
      default() {
        return ['mollie'];
      },
    },
  },
  components: {
    CustomerDetailsForm,
    SelectShippingForm,
    OrderSummary,
    AddressDisplay,
    CartItemsTable,
    CouponInput,
  },
  computed: {
    activeOrder() {
      return this.store?.activeOrder || {};
    },
    hasShippingSelected() {
      return !!this.store?.activeOrder?.shippingLines?.[0]?.shippingMethod?.id;
    },
  },
  data() {
    return {
      activeStep: 0,
      shippingMethods: [],
      loadingPayment: false,
      selectedPaymentMethod: this.paymentMethods[0],
    };
  },
  methods: {
    scrollToTop() {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    },
    goToStep(step) {
      this.activeStep = step;
      this.scrollToTop();
    },
    async gotToShipping() {
      this.goToStep(1);
      this.shippingMethods = await this.vendure.getEligibleShippingMethods();
    },
    async choosePayment() {
      if (this.paymentMethods.length > 1) {
        this.goToStep(3);
      } else {
        await this.startPayment();
      }
    },
    async startPayment() {
      this.loadingPayment = true;
      try {
        await startPayment(this.vendure, this.selectedPaymentMethod);
      } catch (e) {
        this.emitter.emit('error', e);
      } finally {
        this.loadingPayment = false;
      }
    },
  },
};
</script>
<style>
.scrollable-product-overview {
  max-height: 300px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
