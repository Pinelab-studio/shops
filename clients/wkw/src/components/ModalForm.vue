<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Schrijf een review</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Naam">
          <b-input icon="account" placeholder="Vul uw naam in" required>
          </b-input>
        </b-field>

        <b-field label="Email">
          <b-input
            icon="email"
            type="email"
            placeholder="Vul uw e-mailadres in"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Review">
          <b-input type="textarea" placeholder="Wat vindt u van dit product">
          </b-input>
        </b-field>
      </section>
      <section class="modal-card-body">
        <p class="modal-card-title has-text-centered pb-6">
          Hoeveel sterren geeft u dit product?
        </p>
        <b-rate class="is-centered pb-5"></b-rate>
      </section>
      <footer class="modal-card-foot">
        <b-button
          class="is-fullwidth"
          label="Plaats review"
          type="is-primary"
        />
      </footer>
    </div>
  </form>
</template>
<script>
export default {
  props: ['email', 'password', 'canCancel'],
};
</script>

<style>
.is-centered {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
