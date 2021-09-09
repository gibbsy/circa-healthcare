<template>
  <footer>
    <div class="footer__bg-stripe"></div>
    <div class="footer__main">
      <div class="footer__logo">
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
    </div>
    <div class="footer__legals">
      <ul class="legal-links-menu">
        <li v-for="page in legals" :key="page.slug">
          <nuxt-link :to="`/legal/${page.slug}`">{{ page.title }}</nuxt-link>
        </li>
      </ul>
      <p class="copyright">©2021 Circa</p>
    </div>
  </footer>
</template>
<script>
import sanityClient from "~/sanityClient";
import Logo from "~/assets/circa_logo_nofill.svg?inline";
const query = `*[_type == "legalsPage" ]{ title, "slug": slug.current }`;
export default {
  components: {
    Logo,
  },
  data() {
    return {
      legals: [],
    };
  },
  async fetch() {
    this.legals = await sanityClient.fetch(query);
  },
};
</script>
