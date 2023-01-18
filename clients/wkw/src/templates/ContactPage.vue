<template>
  <DefaultLayout>
    <template #content>
      <h2 class="has-text-weight-bold is-5">Contact</h2>
      <br />
      <section class="content">
        <g-link to="tel:0031 6 18441825">
          <p class="has-text-black hover-underline">
            {{ $context.common.telefoon }}
          </p>
        </g-link>
        <br />
        <g-link to="mailto:info@wormenkwekerijwasse.nl">
          <p class="has-text-black hover-underline">
            {{ $context.common.email }}
          </p>
        </g-link>
        <br />
        <div class="has-text-black" v-html="$context.common.adres"></div>
      </section>
    </template>
  </DefaultLayout>
</template>

<script></script>
<style></style>
