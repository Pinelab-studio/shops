<template>
  <DefaultLayout>
    <template #content>
      <br />
      <div class="card">
        <div class="card-image">
          <b-image
            ratio="image is-6by1"
            :src="getDefaultImage($context.blog.featured_image.id)"
          ></b-image>
        </div>
        <div class="card-content">
          <div class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img
                  class="is-rounded"
                  src="/img/frank-wasse-profielfoto.jpg"
                />
              </p>
            </figure>
            <div class="media-content">
              <p class="has-text-weight-bold is-size-4">
                {{ $context.blog.user_created.first_name }}
                {{ $context.blog.user_created.last_name }}
              </p>
              <p class="has-text-grey">
                {{ $context.blog.date_created | date }}
              </p>
            </div>
          </div>

          <div class="content">
            <div class="has-text-weight-bold is-size-3">
              {{ $context.blog.titel }}
            </div>
            <br />
            <div v-html="$context.blog.content"></div>
          </div>

          <div v-if="$context.disqusSlug" id="migrated-comments">
            <!--- Get migrated comments -->
            <Disqus
              shortname="wormenkwekerijwasse"
              :page-config="{ slug: $context.disqusSlug }"
              lang="nl"
            />
          </div>
          <div v-else id="new-thread">
            <!--- Otherwise create new disciossion -->
            <Disqus shortname="wormenkwekerijwasse" lang="nl" />
          </div>
        </div>
      </div>
    </template>
  </DefaultLayout>
</template>

<script></script>
<style></style>
