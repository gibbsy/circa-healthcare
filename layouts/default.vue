<template>
  <div :id="containerId" :class="['app-container', { 'is-mobile': isMobile }]">
    <Nuxt v-if="showSite === true" />
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
          :class="[
            'cta-primary',
            'btn-contact',
            { on: showContact },
            { 'full-color': fullColor },
          ]"
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
    <!--  <transition name="fade">
      <video-overlay
        v-if="playIntro === true && introPlayed === false"
        :vimeo-id="config.stingVideo"
        :done-fn="onIntroPlayed"
      ></video-overlay>
    </transition> -->
  </div>
</template>
<script>
import mobile from "is-mobile";
import sanityClient from "../sanityClient";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

const query = /* groq */ `
  *[_id=="global-config"][0]{
  siteTitle, url, siteDescription, ogImage,
  stingVideo,
  defaultTheme,
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
      playIntro: false,
      showSite: false,
      cookiesOk: true,
      config: {},
      navOn: false,
      animating: false,
      scroller: [],
      contactActive: true,
      routeTransitioning: false,
    };
  },

  async fetch() {
    this.config = await sanityClient.fetch(query);
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    introPlayed() {
      return this.$store.state.introPlayed;
    },
    texSuffix() {
      return this.isMobile ? "" : "-lrg";
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
    fullColor() {
      return this.$store.state.fullColor;
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
      console.log(value.name);
    },
    config(obj) {
      console.log(obj);
      if (obj.defaultTheme !== undefined) {
        const theme = obj.defaultTheme;
        this.$store.commit("setTheme", theme);
        this.$store.commit("saveConfig", obj);
        document.documentElement.style.setProperty(
          "--primary-color",
          theme.primaryColor.value
        );
        document.documentElement.style.setProperty(
          "--secondary-color",
          theme.secondaryColor.value
        );
        document.documentElement.style.setProperty(
          "--bg-texture",
          `var(--tex-${theme.texture}${this.texSuffix})`
        );
      }
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
    // Remove intro video overlay
    // console.log(this.$route.name);
    // if (this.$route.name === "index" && this.isMobile === false) {
    //   this.playIntro = true;
    // } else {
    // this.showSite = true;
    // }
    gsap.config({ force3D: true });
    gsap.registerPlugin(ScrollTrigger);
    window.setTimeout(() => {
      this.cookiesOk = this.$cookies.get("circa-accept-cookies");
      // this.cookiesOk = false;
    }, 3000);
    this.initScrollWatcher();
    this.$nextTick(() => {
      this.showSite = true;
    });
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
    /* onIntroPlayed() {
      this.$store.commit("onIntroPlayed");
      this.$nextTick(() => {
        this.showSite = true;
      });
    }, */
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
  },
};
</script>
