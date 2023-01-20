<template>
  <div>
    <b-navbar is-fixed-top>
      <template #brand>
        <div class="container is-widescreen section py-4">
          <div class="columns is-mobile is-vcentered">
            <!-- LOGO -->
            <div class="column">
              <g-link to="/">
                <img
                  src="/img/wavkits-black.png"
                  width="130px"
                  alt="wavkits.com logo"
                  id="logo"
                  class="cursor"
                />
              </g-link>
            </div>
            <!-- SEARCH -->
            <div class="column is-hidden-mobile">
              <b-field grouped>
                <b-input
                  rounded
                  placeholder="Search for kits..."
                  color="grey"
                  type="search"
                  icon="magnify has-text-black"
                  class="is-black"
                >
                </b-input>
                <p class="control">
                  <b-button class="is-black is-rounded">
                    <i class="mdi mdi-arrow-right mdi-24px has-text-white"></i>
                  </b-button>
                </p>
              </b-field>
            </div>
            <!-- ICONS -->
            <div class="column">
              <div class="is-flex is-pulled-right">
                <!--- mobile search icon -->
                <b-button
                  class="is-black is-rounded mr-5 is-hidden-tablet"
                  @click="isSearchModalActive = true"
                >
                  <i class="mdi mdi-magnify mdi-24px has-text-white"></i>
                </b-button>
                <!--- cart icon -->
                <b-button class="is-black is-rounded">
                  <i class="mdi mdi-basket-outline mdi-24px has-text-white"></i>
                  <a id="cart-badge" class="tag is-rounded is-white">10</a>
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-navbar>
  </div>
</template>

<script></script>
<style>
#cart-badge {
  margin-top: -5px;
  margin-left: -5px;
  position: absolute;
  text-decoration: none;
  height: 1rem;
}

.navbar-brand {
  width: 100%;
}

.input:active,
.input:focus,
.input:hover {
  box-shadow: none;
  -webkit-box-shadow: none;
  border-color: black;
}

.input {
  background-color: transparent;
  border-color: black;
  color: black;
}
</style>
