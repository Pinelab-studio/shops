<template>
  <div>
    <div id="banner" class="notification is-dark-green p-1 has-text-centered">
      <p class="mdi mdi-truck-outline has-text-white">
        Vanaf €50,- gratis verzenden binnen NL
      </p>
    </div>
    <b-navbar centered transparent class="is-fixed-top">
      <template #brand>
        <div class="container is-widescreen section" id="top-navbar">
          <div class="columns is-mobile pt-2" style="width: 100%">
            <div class="column">
              <g-link to="/" aria-current="page">
                <img
                  src="/img/logo-wormenkwekerijwasse.png"
                  width="120px"
                  id="logo"
                />
              </g-link>
            </div>
            <div id="search" class="column is-hidden-mobile">
              <b-field position="is-centered">
                <b-input
                  placeholder="Zoek producten..."
                  type="search"
                ></b-input>
                <p class="control">
                  <b-button type="is-shadowless is-hovered">
                    <i class="mdi mdi-magnify mdi-26px has-text-white"></i>
                  </b-button>
                </p>
              </b-field>
            </div>
            <div class="column has-text-right" id="icons">
              <span class="icon is-medium is-hidden-tablet is-clickable">
                <i
                  class="mdi mdi-magnify mdi-36px has-text-primary mr-6"
                  @click="isSearchModalActive = true"
                  style="z-index: 999"
                >
                </i>
              </span>
              <Basket
                :vendure="$vendure"
                :store="$store"
                :emitter="$emitter"
                cartUrl="/winkelmand/"
                @cart-button-clicked="
                  $router.push('/winkelmand/').catch((e) => {})
                "
                @checkout-button-clicked="
                  $router.push('/checkout/').catch((e) => {})
                "
              >
                <i class="mdi mdi-basket mdi-36px has-text-primary"></i>
              </Basket>
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
            <a class="navbar-link"> Meer </a>
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
            <a class="navbar-link"> Informatie </a>
            <div class="navbar-dropdown">
              <div class="container section py-1">
                <div class="columns has-text-left">
                  <div class="column">
                    <g-link to="/" class="navbar-item px-0">
                      Advies en informatie
                    </g-link>
                    <g-link to="/" class="navbar-item px-0"> FAQ</g-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar-item is-hoverable shadow">
            <g-link to="/" class="navbar-link is-arrowless"> Contact</g-link>
          </div>
        </div>

        <!-- Mobile menu -->
      </template>
    </b-navbar>
  </div>
</template>

<script>
import Basket from 'pinelab-storefront/lib/components/Basket';

export default {
  props: ['collections'],
  components: { Basket },
};
</script>
<style>
.navbar-brand {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-shrink: 0;
}

.navbar {
  flex-wrap: wrap;
}

.navbar-burger {
  margin-top: 50px !important;
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

#logo {
  height: 75px;
  padding: 0 0 5px 0;
  object-fit: contain;
  margin-left: -4px;
}

#top-navbar {
  padding-top: 25px;
  padding-bottom: 0;
  height: 105px;
}

#banner {
  z-index: 31;
  position: fixed;
  top: 0;
  width: 100%;
}

#search {
  padding-top: 35px;
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

.navbar-menu {
  background: #4c8a45;
  justify-content: center;
}

#icons {
  padding-top: 25px;
  padding-right: 0;
}

.cart-badge {
  margin-left: -10px;
}
</style>
