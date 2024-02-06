<template>
  <form
    id="sib-form"
    method="POST"
    target="submitFrame"
    action="https://862544ec.sibforms.com/serve/MUIFAOfxzYV_a3fyTlTd0U2IUl79FiASwykFHrm29QiljdAkyfZRFbM3t0Qp1k3c9L47gsJ1aTBM9CboV7v0xFHSdJdmhsAwdBwPCSF0iTYOYpgFOQV7NDKiuxXhaaFKLEwBYP6FPvjS_RQFZsb2tQMLKSSuk8Jj0yu48gMfj3NVV7_GGX6lPniqwXyiI1rjtZHh8tTtxjY0ZT0P"
  >
    <div class="container is-widescreen section p-5">
      <div class="has-text-centered">
        <div id="newsletterMessage" class="has-text-white" v-html="text"></div>
      </div>
      <div class="column">
        <b-field position="is-centered" grouped group-multiline>
          <b-input
            v-if="!isSubscribed"
            maxlength="200"
            type="text"
            id="FIRSTNAME"
            name="FIRSTNAME"
            required
            autocomplete="off"
            :placeholder="$l('review.name')"
            validation-message=" "
          ></b-input>
          <b-input
            v-if="!isSubscribed"
            type="email"
            id="EMAIL"
            name="EMAIL"
            required
            autocomplete="off"
            :placeholder="$l('customer-details.email')"
            validation-message=" "
          >
          </b-input>
          <p class="control">
            <b-button
              native-type="submit"
              type="is-dark-green is-shadowless is-hovered"
              @click="onBrevoSubmit"
              :disabled="isSubscribed"
              :loading="loading"
              :label="
                $l(isSubscribed ? 'common.subscribed' : 'common.subscribe')
              "
            />
          </p>
        </b-field>
      </div>
    </div>
    <iframe style="display: none" name="submitFrame" id="submitFrame"></iframe>
  </form>
</template>
<script>
export default {
  // This form submits to target="iframe" to prevent redirect and/or new tab opening
  props: {
    text: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      isSubscribed: false,
      loading: false,
    };
  },
  methods: {
    onBrevoSubmit() {
      const form = document.getElementById('sib-form');
      if (form.checkValidity()) {
        try {
          this.loading = true;
          form.submit();
          this.isSubscribed = true;
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
