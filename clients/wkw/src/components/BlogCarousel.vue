<template>
  <div>
    {{ blogs }}

    <b-carousel-list
      :data="blogs"
      :items-to-show="itemsToShow"
      :breakpoints="galleryBreakpoints"
      :arrowHover="false"
    >
      <template #item="blog">
        <g-link :to="blog.url">
          <div class="container-overlay">
            <div class="card-image">
              <b-image
                ratio="image is-2by1"
                :src="getDefaultImage(blog.image.id)"
              ></b-image>
            </div>
            <div class="overlay"></div>
            <div class="card-content-no-show has-background-success p-5">
              <div class="media">
                <div class="media-content">
                  <p class="title has-text-white has-text-weight-bold is-5">
                    {{ blog.title }}
                  </p>
                  <HomeButton>{{ $l('common.read-more') }}</HomeButton>
                </div>
              </div>
            </div>
          </div>
        </g-link>
      </template>
    </b-carousel-list>
  </div>
</template>
<script>
import HomeButton from '@/components/HomeButton';

export default {
  components: { HomeButton },
  props: ['blogs'],
  data() {
    return {
      itemsToShow: 2,
      galleryBreakpoints: {
        0: {
          itemsToShow: 1,
        },
        768: {
          itemsToShow: 2,
        },
      },
    };
  },
};
</script>
<style>
@media (max-width: 768px) and (min-width: 1024px) {
  .title.is-5 {
    font-size: 0.75rem;
  }
}

.carousel-list.has-shadow {
  box-shadow: none;
}

.card-content-no-show {
  bottom: 0;
  z-index: 1;
  position: absolute;
  width: 100%;
}
</style>
