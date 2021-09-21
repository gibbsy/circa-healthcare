<template>
  <div :id="containerId" class="app-container">
    <Nuxt />

    <transition name="fade" appear>
      <cookie-panel
        v-show="!cookiesOk"
        :click-fn="acceptCookies"
      ></cookie-panel>
    </transition>

    <nav :class="['nav-primary-fixed', { on: navOn }]">
      <div :class="['contact-button-container', { hidden: !contactActive }]">
        <nuxt-link
          to="/contact"
          :class="['cta-primary', 'btn-contact', { on: showContact }]"
        >
          <span class="arrow"> <cta-arrow /> </span>
          Get in touch</nuxt-link
        >
      </div>
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
      page: "",
      ready: false,
      cookiesOk: true,
      config: {},
      navOn: false,
      animating: false,
      scroller: [],
      contactActive: true,
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
    showContact() {
      return this.containerId !== "contact" && this.navOn === false;
    },
    scrollPos() {
      console.log(ScrollTrigger.scroll());
      return ScrollTrigger.scroll();
    },
  },
  watch: {
    $route(value) {
      this.page = value.name;
      console.log(value);
    },
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    console.log("mounted");
    window.setTimeout(() => {
      this.cookiesOk = this.$cookies.get("circa-accept-cookies");
      // this.cookiesOk = false;
    }, 3000);
    this.initScrollWatcher();
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
    },
    closeNav() {
      this.navOn = false;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
    },
    initScrollWatcher() {
      const that = this;
      this.scroller = gsap.to(".contact-button-container", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {},
        scrollTrigger: {
          onLeave() {
            that.contactActive = false;
          },
          onEnterBack() {
            that.contactActive = true;
          },
          start: "top top",
          scrub: true,
          end: 100,
        },
      });
    },
    /*  contactToggle() {
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
    },
    closeContact() {
      this.contactOn = false;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
    }, */
  },
};
</script>
<style lang="scss" scoped></style>
