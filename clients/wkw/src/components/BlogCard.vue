<template>
  <div class="card">
    <div class="card-image">
      <b-image ratio="image is-6by1" :src="image"></b-image>
    </div>
    <div class="card-content">
      <div class="media">
        <figure class="media-left">
          <p class="image is-48x48">
            <img class="is-rounded" src="/img/frank-wasse-profielfoto.jpg" />
          </p>
        </figure>
        <div class="media-content">
          <p class="has-text-weight-bold is-size-4">
            {{ fName }}
            {{ lName }}
          </p>
          <p class="has-text-grey">
            {{ date }}
          </p>
        </div>
      </div>

      <div class="content">
        <div class="has-text-weight-bold is-size-3">
          {{ title }}
        </div>
        <br />
        <!-- <div v-html="content"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [image, fName, lName, date, content],
};
</script>
