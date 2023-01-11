<template>
  <div>
    <template v-for="review in reviews">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong
                >{{ review.author_name }} -
                {{ review.review_date | date }}</strong
              >
              <b-rate
                v-model="review.rating"
                class="my-2"
                :disabled="true"
                size="is-small"
              >
              </b-rate>
              <CollapsedText :text="review.message" />
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
                    <CollapsedText :text="review.response" />
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
import CollapsedText from './CollapsedText';
export default {
  components: { CollapsedText },
  props: ['reviews'],
};
</script>

<style></style>
