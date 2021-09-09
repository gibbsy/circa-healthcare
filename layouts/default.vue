<template>
  <div>
    <div :id="containerId" data-scroll-container>
      <Nuxt />
      <transition name="slide-in">
        <main-nav
          v-show="navOn"
          :links="mainNav"
          :contact-details="config.contactDetails"
          :socials="config.socials"
          :click-fn="navToggle"
        ></main-nav>
      </transition>
      <transition name="fade" appear>
        <cookie-panel
          v-show="!cookiesOk"
          :click-fn="acceptCookies"
        ></cookie-panel>
      </transition>
      <div :class="['hamburger', { on: navOn }]">
        <button @click.prevent="navToggle">
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
const query = /* groq */ `
  *[_id=="global-config"][0]{
  siteTitle, url, siteDescription,
  mainNavigation[]->{title, slug},
  contactDetails[]->{name, email, address, phone},
  socials[]{title, href},
  footerLinks[]->{title, "slug": slug.current}
  }
`;
export default {
  data() {
    return {
      ready: false,
      cookiesOk: true,
      config: {},
      navOn: false,
    };
  },
  async fetch() {
    this.config = await sanityClient.fetch(query);
  },
  computed: {
    mainNav() {
      return this.config.mainNavigation;
    },
    containerId() {
      return this.$route.name;
    },
  },
  watch: {
    $route(value) {
      this.page = value.name;
      console.log(value);
    },
  },
  mounted() {
    window.setTimeout(() => {
      this.cookiesOk = this.$cookies.get("circa-accept-cookies");
      // this.cookiesOk = false;
    }, 3000);
  },
  methods: {
    acceptCookies() {
      console.log("cookies Ok");
      this.cookiesOk = true;
      this.$cookies.set("circa-accept-cookies", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
      });
    },
    navToggle() {
      console.log("toggle");
      this.navOn = !this.navOn;
    },
  },
};
</script>
<style lang="scss" scoped></style>
