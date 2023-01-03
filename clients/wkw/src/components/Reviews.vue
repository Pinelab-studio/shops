<template>
  <div>
    <template v-for="review in reviews">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong
                >{{ review.author_name }} -
                {{ review.date_created | date }}</strong
              >
              <b-rate
                v-model="review.rating"
                class="my-2"
                :disabled="true"
                size="is-small"
              >
              </b-rate>
              {{ review.message }}
              <br />
            </p>
          </div>

          <div v-if="review.response">
            <article class="media">
              <figure class="media-left my-1 mx-3">
                <p class="image is-48x48">
                  <img
                    class="is-rounded"
                    src="/img/frank-wasse-profielfoto.jpg"
                  />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>Frank van Wormenkwekerijwasse</strong>
                    <br />
                    {{ review.response }}
                    <br />
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  props: ['reviews'],
};
</script>

<style></style>
