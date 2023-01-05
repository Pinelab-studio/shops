<template>
  <div>
    <h4 class="title has-text-black has-text-weight-bold is-5 pt-5">Blog</h4>
    <div class="columns is-mobile">
      <b-carousel-list
        :data="blogposts"
        :items-to-show="itemsToShow"
        :breakpoints="galleryBreakpoints"
        :arrowHover="false"
      >
        <template #item="blogpost">
          <div class="column">
            <g-link :to="`/blog/${blogpost.slug}`">
              <div class="card container-overlay">
                <div class="card-image">
                  <b-image ratio="2by1" :src="blogpost.image"></b-image>
                </div>
                <div class="card-content-no-show has-background-success p-5">
                  <div class="media">
                    <div class="media-content">
                      <p class="title has-text-white has-text-weight-bold is-5">
                        {{ blogpost.title }}
                      </p>
                      <HomeButton>{{ $l('common.read-more') }}</HomeButton>
                    </div>
                  </div>
                </div>
              </div>
            </g-link>
          </div>
        </template>
      </b-carousel-list>
    </div>
  </div>
</template>
<script>
import HomeButton from '@/components/HomeButton';

export default {
  components: { HomeButton },
  data() {
    return {
      itemsToShow: 2,
      galleryBreakpoints: {
        0: {
          itemsToShow: 1,
        },
        680: {
          itemsToShow: 2,
        },
      },
      blogposts: [
        {
          title: 'Geen gezonde bodem zonder wormen',
          image:
            'https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg',
          slug: 'geen-gezonde-bodem-zonder-wormen',
        },
        {
          title: 'Geen gezonde bodem zonder wormen',
          image:
            'https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg',
          slug: 'geen-gezonde-bodem-zonder-wormen',
        },
        {
          title: 'Geen gezonde bodem zonder wormen',
          image:
            'https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg',
          slug: 'geen-gezonde-bodem-zonder-wormen',
        },
        {
          title: 'Geen gezonde bodem zonder wormen',
          image:
            'https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg',
          slug: 'geen-gezonde-bodem-zonder-wormen',
        },
        {
          title: 'Geen gezonde bodem zonder wormen',
          image:
            'https://storage.googleapis.com/wassets/preview/ba/seeds__preview.jpeg',
          slug: 'geen-gezonde-bodem-zonder-wormen',
        },
      ],
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
