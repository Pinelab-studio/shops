<template>
  <div>
    <template v-for="index in 5">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Raul Santing</strong> - <strong>December 2022</strong>
              <b-rate class="my-3" size="is-small"> </b-rate>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              porta eros lacus, nec ultricies elit blandit non. Suspendisse
              pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus
              turpis.
              <br />
            </p>
          </div>

          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Wormenkwekerij Wasse</strong>
                  <br />
                  Donec sollicitudin urna eget eros malesuada sagittis.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Aliquam blandit nisl a
                  nulla sagittis, a lobortis leo feugiat.
                  <br />
                </p>
              </div>

              <article class="media">
                Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu
                lorem cursus ullamcorper sit amet nec massa.
              </article>

              <article class="media">
                Morbi vitae diam et purus tincidunt porttitor vel vitae augue.
                Praesent malesuada metus sed pharetra euismod. Cras tellus odio,
                tincidunt iaculis diam non, porta aliquet tortor.
              </article>
            </div>
          </article>
        </div>
      </article>
    </template>
  </div>
</template>

<script>
export default {
  props: ['name', 'date', 'starRating', 'reviewDescription'],
};
</script>
