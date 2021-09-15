<template>
  <footer :style="cssVars">
    <div class="footer-branding">
      <div class="footer-logo">
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
    </div>
    <div class="footer-main" col-9 col-xl-10>
      <div class="footer-nav">
        <h6 class="section-label">Explore</h6>
        <ul>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li v-for="link in links" :key="link.slug.current">
            <nuxt-link :to="link.slug.current">{{ link.title }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="footer-contacts">
        <h6 class="section-label">Get in touch</h6>
        <div class="footer-contacts-container">
          <div
            v-for="location in contactDetails"
            :key="location.name"
            class="footer-contacts-item"
          >
            <p>{{ location.name }}</p>
            <block-content :blocks="location.address"></block-content>
          </div>
          <div class="footer-contacts-item">
            <p>Social</p>
            <ul class="footer-socials-menu">
              <li v-for="link in socials" :key="link.title">
                <a :href="link.href">{{ link.title }}></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-legals">
        <ul class="legal-links-menu">
          <li v-for="link in footerLinks" :key="link.slug.current">
            <nuxt-link :to="`/legal/${link.slug}`">{{ link.title }}</nuxt-link>
          </li>
          <li>
            <p class="copyright">©2021 Circa</p>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
// import sanityClient from "~/sanityClient";
import Logo from "~/assets/circa_logo_nofill.svg?inline";
// const query = `*[_type == "legalsPage" ]{ title, "slug": slug.current }`;
export default {
  components: {
    Logo,
  },
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    contactDetails: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
    footerLinks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      legals: [],
    };
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": "#212a33",
        "--secondary-color": "#477e9f",
        "--bg-texture": `var(--tex-default);`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/style/components/footer";
</style>
