<template>
  <div
    :id="containerId"
    :class="['app-container', 'error-page', { 'is-mobile': isMobile }]"
  >
    <error-page :theme="theme"></error-page>
    <transition name="fade" appear>
      <cookie-panel
        v-show="!cookiesOk"
        :accept-fn="acceptCookies"
      ></cookie-panel>
    </transition>

    <nav :class="['nav-primary-fixed', { on: navOn && showSite === true }]">
      <div :class="['contact-button-container', { hidden: !contactActive }]">
        <nuxt-link
          to="/contact-us"
          :class="['cta-primary', 'btn-contact', { on: showContact }]"
        >
          <span class="arrow"> <cta-arrow /> </span>
          Get in touch</nuxt-link
        >
      </div>
      <button
        class="hamburger"
        aria-label="Toggle navigation"
        @click.prevent="navToggle"
      >
        <span></span>
        <span></span>
      </button>
    </nav>
    <transition mode="out-in" name="fade" appear>
      <app-footer
        v-show="!routeTransitioning && showSite === true"
        :links="mainNav"
        :contact-details="config.contactDetails"
        :socials="config.socials"
        :footer-links="config.footerLinks"
      ></app-footer>
    </transition>
    <transition name="nav-transition">
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
import mobile from "is-mobile";
import sanityClient from "../sanityClient";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

const query = /* groq */ `
{
  "config": *[_id=="global-config"][0]{
  siteTitle, url, siteDescription,
  stingVideo,
  mainNavigation[]->{title, slug},
  contactDetails[]->{name, email, address, phone},
  socials[]{title, href},
  footerLinks[]->{title, "slug": slug.current}
  },
  "theme": *[_id=="pageContact"][0]{ 
      theme
    }
}
`;
export default {
  components: { CtaArrow },

  async asyncData() {
    const pData = await sanityClient.fetch(query);
    const { config, theme } = pData;
    return {
      config,
      theme,
    };
  },
  data() {
    return {
      page: "",
      ready: false,
      playIntro: "",
      showSite: true,
      cookiesOk: true,
      /* theme: {
        _type: "pageTheme",
        primaryColor: {
          title: "Dark Blue",
          value: "#00304c",
        },
        secondaryColor: {
          title: "Teal",
          value: "#229fa0",
        },
        texture: "circuit",
      }, */
      navOn: false,
      animating: false,
      scroller: [],
      contactActive: true,
      routeTransitioning: false,
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    mainNav() {
      return this.config.mainNavigation;
    },
    containerId() {
      return this.$route.name;
    },
    showContact() {
      return (
        this.containerId !== "contact-us" &&
        this.navOn === false &&
        this.showSite === true
      );
    },
  },
  watch: {
    $route(value) {
      this.page = value.name;
      // animate the footer out when route changes
      this.routeTransitioning = true;
      setTimeout(() => {
        this.routeTransitioning = false;
      }, 1500);
    },
  },
  beforeMount() {
    if (mobile({ tablet: true, featureDetect: true })) {
      this.$store.commit("setMobile", true);
    } else {
      this.$store.commit("setMobile", false);
    }
  },
  mounted() {
    gsap.config({ force3D: true });
    gsap.registerPlugin(ScrollTrigger);
    console.log("mounted");
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
    },
    closeNav() {
      this.navOn = false;
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 1000);
    },
  },
};
</script>
