<template>
  <form v-on:submit="setCustomerDetails($event)">
    <div class="columns">
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.firstname')}*`"
              aria-label="firstname"
              type="text"
              required
              v-model="customer.firstName"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-account"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.lastname')}*`"
              aria-label="lastname"
              type="text"
              required
              v-model="customer.lastName"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-account"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="$l('customer-details.company')"
              type="text"
              aria-label="company"
              v-model="address.company"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-office-building"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="$l('customer-details.phone')"
              type="text"
              aria-label="phonenumber"
              v-model="customer.phoneNumber"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-cellphone-basic"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.email')}*`"
              aria-label="emailaddress"
              type="text"
              required
              v-model="customer.emailAddress"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-email"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns is-mobile">
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.postalcode')}*`"
              aria-label="postalcode"
              type="text"
              required
              v-model="address.postalCode"
              v-on:input="lookupShippingAddress()"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-mailbox"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field is-small-field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.housenr')}*`"
              aria-label="housenumber"
              type="text"
              required
              v-model="address.streetLine2"
              v-on:input="lookupShippingAddress()"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-home"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.street')}*`"
              aria-label="streetname"
              type="text"
              required
              v-model="address.streetLine1"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-home"></i>
            </span>
          </p>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <b-input
              :placeholder="`${$l('customer-details.city')}*`"
              aria-label="city"
              type="text"
              required
              v-model="address.city"
            />
            <span class="icon is-small is-left">
              <i class="mdi mdi-city"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <b-field>
      <b-select
        :placeholder="$l('customer-details.country')"
        aria-label="country"
        name="country"
        icon="earth"
        v-model="address.countryCode"
      >
        <option
          v-for="country of availableCountries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </b-select>
    </b-field>

    <!--------------------- Billing address ----------------------------->
    <div class="has-text-right has-text-left-mobile my-4">
      <b-field>
        <b-checkbox
          v-model="hasDifferentBillingAddress"
          aria-label="different billingaddress"
        >
          {{ $l('customer-details.different-billing-address') }}
        </b-checkbox>
      </b-field>
    </div>
    <div v-if="hasDifferentBillingAddress">
      <h4>{{ $l('customer-details.billing-address') }}</h4>
      <div class="columns">
        <div class="column">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <b-input
                :placeholder="$l('customer-details.company')"
                aria-label="billing company"
                type="text"
                v-model="billingAddress.company"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-office-building"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <b-input
                :placeholder="`${$l('customer-details.postalcode')}`"
                type="text"
                v-model="billingAddress.postalCode"
                aria-label="billing postalcode"
                v-on:input="lookupBillingAddress()"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-mailbox"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field is-small-field">
            <p class="control is-expanded has-icons-left">
              <b-input
                :placeholder="`${$l('customer-details.housenr')}`"
                aria-label="billing housenumber"
                type="text"
                v-model="billingAddress.streetLine2"
                v-on:input="lookupBillingAddress()"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-home"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <b-input
                :placeholder="`${$l('customer-details.street')}`"
                aria-label="billing streetname"
                type="text"
                v-model="billingAddress.streetLine1"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-home"></i>
              </span>
            </p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <b-input
                :placeholder="`${$l('customer-details.city')}`"
                aria-label="billing city"
                type="text"
                v-model="billingAddress.city"
              />
              <span class="icon is-small is-left">
                <i class="mdi mdi-city"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <b-field>
        <b-select
          :placeholder="$l('customer-details.country')"
          aria-label="billing country"
          name="country"
          icon="earth"
          v-model="billingAddress.countryCode"
        >
          <option
            v-for="country of availableCountries"
            :key="country.code"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </b-select>
      </b-field>
    </div>

    <div class="columns is-mobile mt-2">
      <div class="column">
        <a @click="$emit('back')" class="button is-outlined"><</a>
      </div>
      <div class="column has-text-right">
        <b-button
          native-type="submit"
          aria-label="submit form"
          class="button"
          :loading="loadingShipping"
        >
          {{ $l('customer-details.submit') }}
        </b-button>
      </div>
    </div>
  </form>
</template>
<script>
import { VendureClient } from '../vendure/vendure.client';
import { debounce } from 'debounce';

export default {
  props: {
    availableCountries: {
      type: Array,
      required: true,
    },
    vendure: {
      type: VendureClient,
      required: true,
    },
  },
  data() {
    return {
      loadingShipping: false,
      hasDifferentBillingAddress: false,
      customer: {
        emailAddress: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
      },
      address: {
        company: undefined,
        city: undefined,
        streetLine1: undefined,
        streetLine2: undefined,
        postalCode: undefined,
        countryCode: 'nl',
      },
      billingAddress: {
        company: undefined,
        city: undefined,
        streetLine1: undefined,
        streetLine2: undefined,
        postalCode: undefined,
        countryCode: 'nl',
      },
    };
  },
  async mounted() {
    const defaultCountry = this.$context?.availableCountries?.find(
      (c) => c.code.toUpperCase() === 'NL'
    );
    this.address.countryCode = defaultCountry?.code || 'nl';
    this.billingAddress.countryCode = defaultCountry?.code || 'nl';
    const activeOrder = await this.vendure.getActiveOrder();
    this.hasDifferentBillingAddress = !!activeOrder?.billingAddress?.postalCode;
    // Prepolutate customer
    const localStorageCustomer = window.localStorage.getItem('vnd_customer');
    const customer = localStorageCustomer
      ? JSON.parse(localStorageCustomer)
      : activeOrder?.customer;
    this.customer.firstName = customer?.firstName;
    this.customer.lastName = customer?.lastName;
    this.customer.phoneNumber = customer?.phoneNumber;
    this.customer.emailAddress = customer?.emailAddress;
    // Prepolutate address
    const localStorageAddress = window.localStorage.getItem('vnd_address');
    const address = localStorageAddress
      ? JSON.parse(localStorageAddress)
      : activeOrder?.shippingAddress;
    this.address.company = address?.company;
    this.address.streetLine1 = address?.streetLine1;
    this.address.streetLine2 = address?.streetLine2;
    this.address.city = address?.city;
    this.address.postalCode = address?.postalCode;
    this.shippingMethods = await this.vendure.getEligibleShippingMethods();
    if (address?.country) {
      const country = this.availableCountries.find(
        (c) => c.name === address.country
      );
      this.address.countryCode = country?.code || 'nl';
    }
    // Prepolutate billing adress
    const localStorageBillingAddress = window.localStorage.getItem(
      'vnd_billing_address'
    );
    const billingAddress = localStorageAddress
      ? JSON.parse(localStorageBillingAddress)
      : activeOrder?.billingAddress;
    this.billingAddress.company = billingAddress?.company;
    this.billingAddress.streetLine1 = billingAddress?.streetLine1;
    this.billingAddress.streetLine2 = billingAddress?.streetLine2;
    this.billingAddress.city = billingAddress?.city;
    this.billingAddress.postalCode = billingAddress?.postalCode;
    this.shippingMethods = await this.vendure.getEligibleShippingMethods();
    if (billingAddress?.country) {
      const country = this.availableCountries.find(
        (c) => c.name === billingAddress.country
      );
      this.billingAddress.countryCode = country?.code || 'nl';
    }
  },
  methods: {
    setCustomerDetails: async function (e) {
      e.preventDefault();
      this.loadingShipping = true;
      const address = {
        ...this.address,
        fullName: `${this.customer.firstName} ${this.customer.lastName}`,
        defaultBillingAddress: !this.hasDifferentBillingAddress,
        defaultShippingAddress: true,
        phoneNumber: this.customer.phoneNumber,
      };
      try {
        await this.vendure.setCustomerForOrder(this.customer);
        await this.vendure.setOrderShippingAddress(address);
        if (this.hasDifferentBillingAddress) {
          await this.vendure.setOrderBillingAddress({
            ...this.billingAddress,
            defaultBillingAddress: true,
          });
        } else {
          // remove billingAddress
          await this.vendure.setOrderBillingAddress({
            countryCode: this.address.countryCode,
            company: null,
            streetLine1: '',
            streetLine2: null,
            postalCode: null,
            city: null,
          });
        }
        this.vendure.setDefaultShippingMethod(); // async
      } catch (e) {
        console.error(e);
        this.$emit('error');
      } finally {
        this.loadingShipping = false;
      }
      // Save details in local storage for next time
      try {
        window.localStorage.setItem(
          'vnd_customer',
          JSON.stringify(this.customer)
        );
        window.localStorage.setItem(
          'vnd_address',
          JSON.stringify(this.address)
        );
        window.localStorage.setItem(
          'vnd_billing_address',
          JSON.stringify(this.billingAddress)
        );
      } catch (e) {
        console.error(e);
      }
      this.$emit('submit');
    },
    async lookupShippingAddress() {
      await this.lookupAddress(this.address);
    },
    async lookupBillingAddress() {
      await this.lookupAddress(this.billingAddress);
    },
    async lookupAddress(address) {
      if (address?.postalCode?.length < 6 || !address?.streetLine2) {
        return;
      }
      const foundAddress = await this.vendure.lookupAddress({
        postalCode: address.postalCode,
        houseNumber: address.streetLine2,
      });
      if (foundAddress && foundAddress.street) {
        address.streetLine1 = foundAddress.street;
        address.city = foundAddress.city;
        address.countryCode = 'nl';
      }
    },
  },
  async created() {
    this.lookupAddress = debounce(this.lookupAddress, 500);
  },
};
</script>
