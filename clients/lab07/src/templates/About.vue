<template>
  <DefaultLayout>
    <template>
      <section class="hero is-justify-content-center is-flex-direction-row">
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            <div class="tile">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <br />
                  <div
                    v-html="$context.aboutPage"
                    class="subtitle content"
                  ></div>
                </article>
              </div>
            </div>
            <div class="tile is-vertical">
              <br />
              <div class="tile">
                <div class="tile is-parent">
                  <article class="tile is-child">
                    <figure class="image">
                      <img :src="getSquareImage($context.aboutImage1.id)" />
                      <p></p>
                    </figure>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child">
                    <figure class="image">
                      <img :src="getSquareImage($context.aboutImage2.id)" />
                    </figure>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </DefaultLayout>
</template>

<style>
article h1 {
  font-size: 3rem;
}

@media only screen and (max-width: 768px) {
  article h1 {
    font-size: 2rem;
  }
  article p {
    font-size: 18px;
  }
}

@media only screen and (max-width: 500px) {
  article h1 {
    font-size: 1.5rem;
  }
  article p {
    font-size: 16px;
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
};
</script>
