<template>
  <div :id="containerId" data-scroll-container>
    <Nuxt />

    <transition name="fade" appear>
      <cookie-panel
        v-show="!cookiesOk"
        :click-fn="acceptCookies"
      ></cookie-panel>
    </transition>

    <nav :class="['nav-primary-fixed', { on: navOn || contactOn }]">
      <transition name="fade">
        <button
          v-show="!navOn"
          class="cta-primary contact-toggle"
          @click.prevent="contactToggle"
        >
          <span class="arrow"> <cta-arrow /> </span>
          Get in touch
        </button>
      </transition>
      <button class="hamburger" @click.prevent="navToggle">
        <span></span>
        <span></span>
      </button>
    </nav>
    <transition name="fade" appear>
      <app-footer
        :links="mainNav"
        :contact-details="config.contactDetails"
        :socials="config.socials"
      ></app-footer>
    </transition>
    <transition name="slide-in">
      <main-nav
        v-if="navOn"
        :links="mainNav"
        :contact-details="config.contactDetails"
        :socials="config.socials"
        :click-fn="navToggle"
      ></main-nav>
    </transition>
    <transition name="slide-in">
      <contact-overlay
        v-if="contactOn"
        :contact-details="config.contactDetails"
        :socials="config.socials"
        :click-fn="contactToggle"
      ></contact-overlay>
    </transition>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

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
  components: { CtaArrow },
  data() {
    return {
      ready: false,
      cookiesOk: true,
      config: {},
      navOn: false,
      contactOn: false,
      hideContact: false,
      animating: false,
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
      if (this.animating) {
        return;
      }
      if (!this.navOn) {
        this.animating = true;
        this.openNav();
      } else {
        this.closeNav();
      }
    },
    openNav() {
      this.navOn = true;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
      // gsap.globalTimeline.pause();
      // ScrollTrigger.getAll().forEach((ST) => ST.disable());
      /*       document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed"; */
    },
    closeNav() {
      this.navOn = false;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
      /*       const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); */
      // gsap.globalTimeline.pause();
      // ScrollTrigger.getAll().forEach((ST) => ST.enable());
    },
    contactToggle() {
      if (this.animating) {
        return;
      }
      if (!this.contactOn) {
        this.animating = true;
        this.openContact();
      } else {
        this.closeContact();
      }
    },
    openContact() {
      this.contactOn = true;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
      // gsap.globalTimeline.pause();
      // ScrollTrigger.getAll().forEach((ST) => ST.disable());
      /*       document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed"; */
    },
    closeContact() {
      this.contactOn = false;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
      /*       const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1); */
      // gsap.globalTimeline.pause();
      // ScrollTrigger.getAll().forEach((ST) => ST.enable());
    },
  },
};
</script>
<style lang="scss" scoped></style>
