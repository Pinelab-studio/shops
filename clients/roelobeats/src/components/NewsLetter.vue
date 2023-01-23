<template>
  <div class="is-widescreen section p-5 has-background-primary">
    <div class="container">
      <div class="columns is-vcentered is-centered">
        <div class="column">
          <div class="has-text-black has-text-centered has-text-weight-bold">
            SIGN UP FOR OUR NEWSLETTER AND RECEIVE 10% OFF!
          </div>
        </div>
        <div class="column has-text-centered">
          <b-field grouped position="is-left">
            <b-input
              id="email-form"
              rounded
              placeholder="example@wavkits.com"
              color="grey"
              type="email"
              icon="email-outline has-text-black"
              class="is-black is-centered"
            >
            </b-input>
            <p class="control">
              <b-button class="is-black is-rounded">
                <i class="mdi mdi-arrow-right mdi-24px has-text-white"></i>
              </b-button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media only screen and (min-width: 464px) {
  #email-form {
    width: 350px;
  }
}
</style>
