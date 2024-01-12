<template>
  <form
    id="sib-form"
    method="POST"
    target="submitFrame"
    action="https://862544ec.sibforms.com/serve/MUIFAFfgu9x1Jwb5559_1f7pDkJ15NiXyDc2Pe-xLXgyYX7Xkt7WYoGPYB1mSnXCYV2DI5xt_1gNYwcM0XNbSjLuTkPT7c8j26yibiFf5MbzH82e9w11R5Vb9RSt0-R3mPD7Bl9XV1xZz-PyEdP6xlZ8Fqy7OAr04t8bRqC7kAhCw491wotz1rfQLkptcAeofQdyMFhL1WCWc84p"
  >
    <div class="container is-widescreen section p-5">
      <div class="has-text-centered">
        <div id="newsletterMessage" class="has-text-white" v-html="text"></div>
      </div>
      <div class="column">
        <b-field position="is-centered" grouped group-multiline>
          <b-input
            maxlength="200"
            type="text"
            id="FIRSTNAME"
            name="FIRSTNAME"
            autocomplete="off"
            :placeholder="$l('review.name')"
          ></b-input>
          <b-input
            type="email"
            id="EMAIL"
            name="EMAIL"
            autocomplete="off"
            :placeholder="$l('customer-details.email')"
          >
          </b-input>
          <p class="control">
            <b-button
              native-type="submit"
              type="is-dark-green is-shadowless is-hovered"
              class="g-recaptcha"
              data-sitekey="6Lc1I0spAAAAAOW30qmNTZEo0ZP1xl5fUKeHTsnh"
              data-callback="onBrevoSubmit"
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
  mounted() {
    // Bind onSubmit to window so recaptcha can call it
    window.onBrevoSubmit = this.onBrevoSubmit;
    // Load recaptcha script
    this.$nextTick(() => {
      let recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute(
        'src',
        'https://www.google.com/recaptcha/api.js'
      );
      document.head.appendChild(recaptchaScript);
    });
  },
  data() {
    return {
      isSubscribed: false,
      loading: false,
    };
  },
  methods: {
    onBrevoSubmit() {
      try {
        this.loading = true;
        document.getElementById('sib-form').submit();
        this.isSubscribed = true;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
