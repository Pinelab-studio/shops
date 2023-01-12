<template>
  <DefaultLayout>
    <template #content>
      <h4 class="has-text-weight-bold is-size-4">{{ $context.blog.titel }}</h4>
      <br />
      <section class="content">
        <div v-html="$context.blog.content"></div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script></script>
<style></style>
