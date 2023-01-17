<template>
  <DefaultLayout>
    <template #content>
      <br />
      <h1 class="title is-1">{{ $l('faq.title') }}</h1>
      <p>{{ $l('faq.message') }}</p>
      <br />
      <br />
      <Disqus
        shortname="wormenkwekerijwasse"
        :page-config="config"
        :lang="$context.lang || 'nl'"
      />
    </template>
  </DefaultLayout>
</template>
<script>
import { Disqus } from 'vue-disqus';

export default {
  components: { Disqus },
  data() {
    return {
      config: {
        slug: 'vragen_reacties_opmerkingen_en_foto_upload',
      },
    };
  },
};
</script>
