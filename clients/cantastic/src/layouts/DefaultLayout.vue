<template>
  <div>
    <b-navbar
      type="is-danger"
      centered
      transparent
      class="is-fixed-top"
      :shadow="false"
    >
      <template #brand>
        <div class="container is-widescreen section" id="top-navbar">
          <div class="columns is-mobile pt-2" style="width: 100%">
            <div class="column">
              <a href="/" aria-current="page">
                <img src="/img/logo.png" alt="Cantastic.nl logo" id="logo" />
              </a>
            </div>
            <div class="column is-hidden-mobile" id="search">
              <Search />
            </div>
            <div class="column has-text-right" id="icons">
              <span class="icon is-medium is-hidden-tablet is-clickable">
                <i
                  class="mdi mdi-magnify mdi-36px"
                  @click="isSearchModalActive = true"
                  style="z-index: 999"
                >
                </i>
              </span>
              <span class="is-hidden-mobile icon is-medium">
                <a
                  :href="`https://wa.me/${$context.phoneNr}`"
                  target="_blank"
                  style="z-index: 99"
                >
                  <i class="has-text-white mdi mdi-whatsapp mdi-36px"></i>
                </a>
              </span>
              <Basket
                :vendure="$vendure"
                :store="$store"
                :emitter="$emitter"
                cartUrl="/winkelmand/"
                checkoutUrl="/checkout/"
                v-slot="{ nrOfItems, open }"
              >
                <span class="icon is-large">
                  <a @click="open()">
                    <i class="mdi mdi-basket mdi-36px has-text-white"></i>
                  </a>
                </span>
                <a @click="open()">
                  <span class="cart-badge">{{ nrOfItems }}</span>
                </a>
              </Basket>
            </div>
          </div>
        </div>
      </template>
      <!-------------------- Nav items ------------------>
      <template #start>
        <!--------------- Desktop menu -------------------------->
        <div
          class="container is-widescreen section is-hidden-mobile"
          id="navbar-items-wrapper"
        >
          <template v-for="(collection, i) of $context.collections">
            <template v-if="!hasChildren(collection)">
              <!-------------------- Single collection ------------------>
              <g-link
                class="navbar-item is-uppercase navbar-link is-arrowless is-family-secondary"
                :to="`/categorie/${collection.slug}`"
              >
                {{ collection.name }}
              </g-link>
            </template>
            <template v-else>
              <!-------------------- Collection with children ------------------>
              <b-navbar-dropdown
                :label="collection.name"
                tag="g-link"
                :to="`/categorie/${collection.slug}`"
                class="is-uppercase is-family-secondary"
                arrowless
                hoverable
                :close-on-click="true"
              >
                <div class="container is-widescreen section py-1">
                  <div class="columns is-capitalized">
                    <template
                      v-for="subCollection of getChildrenWithChildren(
                        collection
                      )"
                    >
                      <!-------------------- Children with children ------------------>
                      <div
                        class="column is-3"
                        v-for="(chunk, i) of getChunks(
                          subCollection.children,
                          collection
                        )"
                      >
                        <g-link :to="`/categorie/${subCollection.slug}/`">
                          <h5 class="navbar-item is-hidden-mobile px-0">
                            {{ i == 0 ? subCollection.name : '&nbsp;' }}
                          </h5>
                        </g-link>
                        <g-link
                          v-for="subsub of chunk"
                          :key="subsub.slug"
                          :to="`/categorie/${subsub.slug}`"
                          class="navbar-item sub px-0"
                        >
                          {{ subsub.name }}
                        </g-link>
                      </div>
                    </template>
                    <!-------------------- Leaf children ------------------>
                    <template v-if="hasLeafChildren(collection)">
                      <div
                        class="column is-3"
                        v-for="(chunk, i) of getChunks(
                          getLeafChildren(collection),
                          collection
                        )"
                      >
                        <h5 class="navbar-item is-hidden-mobile px-0">
                          <template v-if="i == 0">
                            {{
                              hasChildrenWithChildren(collection)
                                ? 'Overig'
                                : collection.name
                            }}
                          </template>
                          <template v-else> &nbsp;</template>
                        </h5>
                        <template v-for="subCollection of chunk">
                          <g-link
                            class="navbar-item sub px-0"
                            :to="`/categorie/${subCollection.slug}/`"
                            >{{ subCollection.name }}
                          </g-link>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </b-navbar-dropdown>
            </template>
          </template>
        </div>

        <!------------ Mobile menu ------------->
        <div
          class="container is-widescreen section py-2 is-hidden-desktop"
          id="mobile-navigation"
        >
          <template v-for="collection of $context.collections">
            <g-link
              class="is-uppercase is-family-secondary is-block pb-2"
              :to="`/categorie/${collection.slug}`"
            >
              <b>{{ collection.name }}</b>
            </g-link>
            <g-link
              v-for="subCollection of collection.children"
              :key="subCollection.slug"
              class="pl-3 pb-2 is-block"
              :to="`/categorie/${subCollection.slug}`"
            >
              {{ subCollection.name }}
            </g-link>
          </template>
        </div>
      </template>
    </b-navbar>

    <!-------------------- Content ------------------>
    <div class="content-container">
      <transition name="fade" appear>
        <div class="container is-widescreen section">
          <div
            v-if="!$context.hideUsps"
            class="usps is-flex-desktop is-vcentered is-justify-content-space-between mt-4 is-hidden-mobile is-hidden-tablet-only"
          >
            <template v-for="usp of $context.usps">
              <div class="is-flex">
                <b-icon
                  icon="crown-circle"
                  size="is-medium"
                  type="is-info"
                  class="is-vcentered"
                ></b-icon>
                <div v-html="usp" class="pl-2"></div>
              </div>
            </template>

            <b-rate
              class="is-inline is-vcentered is-clickable"
              v-model="$context.rating"
              icon="star-box"
              :max="5"
              locale="nl-NL"
              :show-score="false"
              :disabled="false"
              @click.native="openReviews()"
            >
            </b-rate>
          </div>
          <br />
          <Breadcrumb
            v-if="$context.breadcrumb"
            :crumbs="$context.breadcrumb"
          />

          <slot name="content" />
        </div>
      </transition>

      <div v-if="$slots.fullwidth" class="has-background-info">
        <div class="container is-widescreen section">
          <slot name="fullwidth" />
        </div>
      </div>

      <div v-if="$slots.content2" class="container is-widescreen section">
        <slot name="content2" />
      </div>
    </div>

    <!--------------------------------- FOOTER ------------------------------->
    <footer class="footer has-background-warning py-0">
      <div class="container is-widescreen section">
        <div class="columns">
          <div class="column is-7">
            <h4 class="has-text-white">
              Exclusieve deals & unieke graffiti content direct in je inbox -
              helemaal gratis
            </h4>
          </div>
          <div class="column is-5">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
    <footer class="footer has-background-info pb-0 has-text-light">
      <div class="container is-widescreen section">
        <div class="columns">
          <div class="column is-3">
            <h5>Categorieën</h5>
            <g-link
              v-for="collection of $context.collections"
              :key="collection.slug"
              :to="`/categorie/${collection.slug}`"
            >
              {{ collection.name }} <br />
            </g-link>
          </div>
          <div class="column is-3">
            <h5>Service</h5>
            <template v-for="page of $context.servicePages">
              <g-link :to="`/${page.slug}/`">{{ page.title }}</g-link>
              <br />
            </template>
          </div>
          <div class="column is-3">
            <h5>Over Cantastic</h5>
            <template v-for="page of $context.aboutPages">
              <g-link :to="`/${page.slug}/`">{{ page.title }}</g-link>
              <br />
            </template>
          </div>
          <div class="column is-3 pb-4" style="border-bottom: 1px solid">
            <h4>Volg @Cantastic.nl en #TeamJoopie</h4>
            <a :href="$context.instagram" target="_blank">
              <b-icon icon="instagram" size="is-medium" class="is-light pr-4">
              </b-icon>
            </a>
            <a :href="$context.facebook" target="_blank">
              <b-icon icon="facebook" size="is-medium" class="is-light">
              </b-icon>
            </a>
          </div>
        </div>

        <div class="has-text-right">
          <a
            class="has-text-grey"
            href="https://pinelab.studio/"
            target="_blank"
            >Met plezier gemaakt door Pinelab</a
          >
        </div>
      </div>
    </footer>

    <!-------------- search modal ------------------->
    <b-modal
      v-model="isSearchModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <div class="card">
        <Search />
      </div>
    </b-modal>
  </div>
</template>
<script>
import Breadcrumb from 'pinelab-storefront/lib/components/Breadcrumb';
import Basket from 'pinelab-storefront/lib/components/Basket';
import Search from '../components/Search';
import NewsletterForm from '../components/NewsletterForm';

export default {
  components: {
    Search,
    Breadcrumb,
    Basket,
    NewsletterForm,
  },
  methods: {
    hasChildren(collection) {
      return collection.children?.length > 0;
    },
    /**
     * Get child collections that don't have deeper children
     */
    getLeafChildren(collection) {
      return collection.children.filter((child) => !this.hasChildren(child));
    },
    /**
     * Checks if the collection has children that don't have deeper children
     */
    hasLeafChildren(collection) {
      return collection.children.some((child) => !this.hasChildren(child));
    },
    getChildrenWithChildren(collection) {
      return collection.children.filter((child) => this.hasChildren(child));
    },
    hasChildrenWithChildren(collection) {
      return collection.children.some((child) => this.hasChildren(child));
    },
    /**
     * Split children of collection into chunks based on the columns available:
     * If already 2 columns, only use 2 extra
     */
    getChunks(collections, parent) {
      const nrOfColumnsTaken = this.hasChildrenWithChildren(parent)
        ? parent.children.length
        : 1;
      let chunkSize = 20; // max chunksize
      if (nrOfColumnsTaken === 1) {
        // If only 1 column is taken, divide the other items over 3 columns
        chunkSize = Math.ceil(collections.length / 4);
      } else if (nrOfColumnsTaken === 2) {
        // if 2 columns taken, divide the other items over 2 columns
        chunkSize = Math.ceil(collections.length / 2);
      }
      const chunks = [];
      for (let i = 0; i < collections.length; i += chunkSize) {
        chunks.push(collections.slice(i, i + chunkSize));
      }
      return chunks;
    },
    openReviews() {
      if (process.isClient) {
        // Open Google Reviews URL
        window.open(
          'https://www.google.com/search?cs=0&output=search&q=Cantastic.nl&ludocid=9089186693307003826&gsas=1&client=ms-android-xiaomi-rvo3&lsig=AB86z5Wo46WuUsoimx7UZhamIZ4Z&kgs=9d212325fb87ec70&shndl=-1&shem=lsp&source=sh/x/kp/local/2#lrd=0x889d21e8646057b:0x7e23472417c573b2,1,,,,',
          '_blank'
        );
      }
    },
  },
  data() {
    return {
      isSearchModalActive: false,
    };
  },
  computed: {
    activeOrder() {
      return this.$store?.activeOrder;
    },
  },
  async mounted() {
    await this.$vendure.getActiveOrder();
  },
};
</script>
<style>
@media screen and (max-width: 1024px) {
  .navbar-dropdown .columns,
  .navbar-dropdown .column {
    padding-top: 0;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}

.navbar-dropdown {
  border-top: none !important;
  border-bottom: 1px solid #dbdbdb;
  box-shadow: none !important;
}

.navbar-item {
  font-weight: bold;
  font-size: 0.9rem;
}

.navbar-item.sub {
  font-weight: normal;
}

a.navbar-item:hover,
.navbar-item a:hover {
  text-decoration: underline;
}

.navbar-brand {
  width: 100%;
}

.navbar {
  flex-wrap: wrap;
}

.navbar-burger {
  margin-top: 6px !important;
}

.navbar-start {
  width: 100%;
}

.navbar-link {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

#navbar-items-wrapper {
  display: inherit;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
}

#logo {
  max-height: 45px;
  height: 45px;
  padding-top: 5px;
}

#search {
  padding-top: 16px;
}

#top-navbar {
  padding-top: 0;
  padding-bottom: 0;
  height: 65px;
}

#icons {
  padding-top: 15px;
  padding-right: 0;
  white-space: nowrap;
  margin-left: -60px;
}

#icons .icon {
  padding-left: 60px;
}

#icons .icon {
  color: white !important;
}

.consent {
  background-color: var(--loop-soft-dark) !important;
}

.consent h4 {
  color: white;
}

.cart-badge {
  background: black;
  border-radius: 50%;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  color: white;
}
</style>
