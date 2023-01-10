<template>
  <div>
    <div
      id="banner"
      class="notification is-dark-green p-1 m-0 has-text-centered"
    >
      <p class="has-text-white">
        {{ $context.common.banner }}
      </p>
    </div>
    <b-navbar class="is-fixed-top" style="padding-top: 27px">
      <template #brand>
        <div class="container is-widescreen section py-4">
          <div class="columns is-mobile is-vcentered">
            <!-- LOGO -->
            <div class="column is-4-mobile">
              <g-link :to="$context.homeUrl">
                <img src="/img/logo-wormenkwekerijwasse.png" width="100px" />
              </g-link>
            </div>
            <!-- SEARCH -->
            <div class="column is-hidden-mobile">
              <!--              <b-field position="is-centered">
                <b-input
                  placeholder="Zoek producten..."
                  type="search"
                ></b-input>
                <p class="control">
                  <b-button type="is-primary is-shadowless is-hovered">
                    <i class="mdi mdi-magnify mdi-26px has-text-white"></i>
                  </b-button>
                </p>
              </b-field>-->
              <Search />
            </div>
            <!-- ICONS -->
            <div class="column">
              <Basket
                class="is-flex is-pulled-right"
                :vendure="$vendure"
                :store="$store"
                :emitter="$emitter"
                :cartUrl="$context.cartUrl"
                :checkoutUrl="$context.checkoutUrl"
                v-slot="{ nrOfItems, open }"
              >
                <div @click="open()">
                  <b-button type="is-primary is-shadowless is-hovered">
                    <i
                      class="mdi mdi-basket-outline mdi-26px has-text-white"
                    ></i>
                  </b-button>
                  <a id="cart-badge" class="tag is-black is-rounded">
                    {{ nrOfItems }}
                  </a>
                </div>
              </Basket>
              <b-button
                type="is-primary is-shadowless is-hovered is-hidden-tablet is-pulled-right mr-2"
              >
                <i class="mdi mdi-magnify mdi-26px has-text-white"></i>
              </b-button>
            </div>
          </div>
        </div>
      </template>
      <template #start>
        <!-- Desktop menu -->
        <div id="navbar-items-wrapper" class="container is-widescreen section">
          <template v-for="collection in collections.slice(0, 4)">
            <template
              v-if="collection.children && collection.children.length > 0"
            >
              <!-- Collection with child collections -->
              <div class="navbar-item has-dropdown is-hoverable shadow">
                <g-link :to="collection.url" class="navbar-link">
                  {{ collection.name }}
                </g-link>
                <div class="navbar-dropdown">
                  <div class="container section py-1">
                    <div class="columns has-text-left">
                      <div class="column">
                        <template
                          v-for="childCollection in collection.children"
                        >
                          <g-link
                            :to="childCollection.url"
                            class="navbar-item px-0"
                          >
                            {{ childCollection.name }}
                          </g-link>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <!-- Collection without child collections -->
              <div class="navbar-item is-hoverable shadow">
                <g-link :to="collection.url" class="navbar-link is-arrowless">
                  {{ collection.name }}
                </g-link>
              </div>
            </template>
          </template>
          <!-- Overflow collections -->
          <div class="navbar-item has-dropdown is-hoverable shadow">
            <a class="navbar-link"> {{ $l('nav.more') }}</a>
            <div class="navbar-dropdown">
              <div class="container section py-1">
                <div class="columns has-text-left">
                  <div class="column">
                    <template v-for="collection in collections.slice(4, 20)">
                      <g-link :to="collection.url" class="navbar-item px-0">
                        {{ collection.name }}
                      </g-link>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Non-collection navigation items -->
          <div class="navbar-item has-dropdown is-hoverable shadow">
            <a class="navbar-link"> {{ $l('nav.information') }} </a>
            <div class="navbar-dropdown">
              <div class="container section py-1">
                <div class="columns has-text-left">
                  <div class="column">
                    <g-link to="/" class="navbar-item px-0">
                      {{ $l('nav.advice') }}
                    </g-link>
                    <g-link to="/" class="navbar-item px-0">
                      {{ $l('nav.faq') }}</g-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item is-hoverable shadow">
            <g-link to="/" class="navbar-link is-arrowless"> Contact</g-link>
          </div>
          <div class="navbar-item is-hoverable shadow">
            <LanguageSwitcher />
          </div>
        </div>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import Basket from 'pinelab-storefront/lib/components/Basket';
import LanguageSwitcher from './LanguageSwitcher';
import Search from './Search';

export default {
  props: ['collections'],
  components: { Search, LanguageSwitcher, Basket },
};
</script>
<style>
#cart-badge {
  margin-top: -10px;
  margin-left: -15px;
  position: absolute;
  text-decoration: none;
}

.navbar-brand {
  width: 100%;
}

.navbar {
  flex-wrap: wrap;
}

.navbar-start {
  width: 100%;
  justify-content: center;
  margin-left: auto;
}

.navbar-item a:hover,
.navbar-item a:focus {
  text-decoration: underline;
  color: #fff;
}

#navbar-items-wrapper {
  display: inherit;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
}

#banner {
  z-index: 31;
  position: fixed;
  top: 0;
  width: 100%;
}

.navbar-item,
.navbar-link.is-arrowless {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.navbar-item,
.navbar-link {
  color: white !important;
  padding-left: 0 !important;
}
</style>
