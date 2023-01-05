<template>
  <DefaultLayout :hideFooter="true" :showPreloader="true">
    <template #fullwidth>
      <div class="outer-wrapper">
        <div class="wrapper">
          <template v-for="project in $context.projects">
            <div class="slide">
              <Portfolio
                :title="project.title"
                :description="project.description"
                :images="project.images"
                @imageClick="openImageModal($event)"
              />
            </div>
          </template>
        </div>
      </div>
      <b-modal v-model="showImageModal" scroll="keep">
        <b-image :src="modalImage">
          <template #placeholder>
            <b-progress size="is-small"></b-progress>
          </template>
        </b-image>
      </b-modal>
    </template>
  </DefaultLayout>
</template>
<script>
import Portfolio from '../components/Portfolio.vue';

export default {
  components: {
    Portfolio,
  },
  data() {
    return {
      showImageModal: false,
      modalImage: undefined,
    };
  },
  methods: {
    openImageModal(event) {
      this.showImageModal = true;
      this.modalImage = event.imageUrl;
    },
  },
};
</script>
<style>
.outer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vw;
  transform-origin: top left;
  transform: rotate(-90deg) translateX(-100vh);
  overflow-x: hidden;
  overflow-y: scroll;
}

.wrapper {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  transform-origin: top left;
  transform: rotate(90deg) translateY(-100vh);
  overflow-x: scroll;
  overflow-y: scroll;
}

.slide {
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outer-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
