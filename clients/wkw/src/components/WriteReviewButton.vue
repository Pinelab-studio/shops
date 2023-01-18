<template>
  <div class="is-inline-flex mt-3 is-pulled-right">
    <b-button
      :label="$l('review.write-button')"
      type="is-primary py-3"
      @click="openModal()"
    />
    <b-modal
      v-model="isReviewComponentModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-label="Review Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <form @submit="submit($event)" v-if="!submitted">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">
                {{ $l('review.title') }} "{{ product.name }}"
              </p>
              <button type="button" class="delete" @click="closeModal()" />
            </header>
            <section class="modal-card-body">
              <b-field :label="$l('review.name')">
                <b-input
                  icon="account"
                  :placeholder="$l('review.name')"
                  required
                  v-model="customerName"
                >
                </b-input>
              </b-field>
              <b-field :label="$l('review.email')">
                <b-input
                  icon="email"
                  type="email"
                  :placeholder="$l('review.email')"
                  v-model="email"
                  required
                >
                </b-input>
              </b-field>
              <b-field :label="$l('review.message')">
                <b-input
                  type="textarea"
                  required
                  :placeholder="
                    $l('review.message-placeholder') + product.name + '?'
                  "
                  v-model="message"
                >
                </b-input>
              </b-field>
            </section>
            <section class="modal-card-body has-text-centered">
              <p class="modal-card-title pb-6">
                {{ $l('review.rating') }}
              </p>
              <b-rate
                size="is-medium"
                class="pb-5 is-inline-block"
                v-model="rating"
              ></b-rate>
            </section>
            <footer class="modal-card-foot">
              <b-button
                class="is-fullwidth"
                :label="$l('review.submit')"
                type="is-primary"
                native-type="submit"
                :loading="loading"
              />
            </footer>
          </div>
        </form>

        <div v-else>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">{{ $l('review.thank-you') }}</p>
              <button type="button" class="delete" @click="closeModal()" />
            </header>
            <footer class="modal-card-foot"></footer>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { gql, GraphQLClient } from 'graphql-request';

const CREATE_REVIEW = gql`
  mutation ($data: create_wkw_reviews_input!) {
    create_wkw_reviews_item(data: $data) {
      vendure_product_id
      author_name
      date_created
      review_date
      message
      product_title
      rating
      response
    }
  }
`;

export default {
  props: ['product'],
  data() {
    return {
      isReviewComponentModalActive: false,
      customerName: undefined,
      email: undefined,
      message: undefined,
      rating: 5,
      client: new GraphQLClient(
        `${process.env.GRIDSOME_DIRECTUS_HOST}/graphql`
      ),
      loading: false,
      submitted: false,
    };
  },
  watch: {
    '$store.activeOrder.customer'(newValue, oldValue) {
      // Set values from order.customer
      this.email = this.email || newValue?.emailAddress;
      this.customerName = this.customerName || newValue?.firstName;
    },
  },
  mounted() {
    // Allow setting of email via URl with "?email=customer@test.com"
    this.email = this.$route.query.email;
    // Open write review when url has "?writeReview=true"
    if (this.$route.query.writeReview) {
      this.openModal();
    }
  },
  methods: {
    openModal() {
      this.isReviewComponentModalActive = true;
      this.$router
        .push({ query: { writeReview: 'true' }, hash: '#review' })
        .catch(() => {});
      // Set values from order.customer
      this.email =
        this.email || this.$store?.activeOrder?.customer?.emailAddress;
      this.customerName =
        this.customerName || this.$store?.activeOrder?.customer?.firstName;
    },
    closeModal() {
      this.$router.push({ query: {}, hash: '#review' }).catch(() => {});
      this.isReviewComponentModalActive = false;
    },
    async submit(event) {
      try {
        event.preventDefault();
        this.loading = true;
        await this.client.request(CREATE_REVIEW, {
          data: {
            author_name: this.customerName,
            email: this.email,
            product_title: this.product.name,
            message: this.message,
            review_date: new Date().toISOString(),
            rating: this.rating,
            vendure_product_id: this.product.id,
          },
        });
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },
  },
};
</script>
