<template>
  <DefaultLayout>
    <template #content>
      <h2 class="has-text-weight-bold is-5">{{ $context.page.titel }}</h2>
      <br />
      <section class="content">
        <div v-html="$context.page.content"></div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script></script>
<style></style>
