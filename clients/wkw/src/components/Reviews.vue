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

          <article class="media">
            <figure class="media-left my-1 mx-3">
              <p class="image is-48x48">
                <img
                  class="is-rounded"
                  src="https://www.beleggersbelangen.nl/wp-content/uploads/2018/01/frank-wasse-belegger-van-de-week.jpg"
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
