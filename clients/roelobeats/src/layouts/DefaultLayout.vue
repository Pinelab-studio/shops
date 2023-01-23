<template>
  <div>
    <AppHeader />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <NewsLetter />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <AppFooter />
  </div>
</template>
<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import NewsLetter from '@/components/NewsLetter.vue';

export default {
  components: { AppFooter, AppHeader, NewsLetter },
};
</script>
