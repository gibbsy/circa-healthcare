<template>
  <div class="ancillary page-wrapper 404" :style="cssVars">
    <section
      id="ancillary"
      class="ancillary-container section-container white-bg"
    >
      <div class="texture-pull-right">
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="ancillary-content content-block--extra-pad">
        <div class="intro-text-lockup col-12 col-xl-10">
          <h1 data-scroll-reveal class="reveal">
            Sorry, we can't find that page.
          </h1>

          <div class="intro-text reveal" data-scroll-reveal>
            <nuxt-link to="/" class="cta-primary" data-scroll-reveal
              ><span class="arrow"> <cta-arrow /> </span>Go to home
              page</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
    <corner-logo :show="showUi" :full-color="true" :delay="0.5"></corner-logo>
  </div>
</template>
<script>
/* import { defaultThemeQuery as query } from "../data/queries";
import sanityClient from "../sanityClient"; */
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

export default {
  components: { CtaArrow },
  mixins: [pageSetup, scrollAnimations],
  props: {
    theme: {
      type: Object,
      default: () => {},
    },
  },
  /*   data() {
    return {
      theme: {},
    };
  }, */
  /*   async fetch() {
    const themeData = await sanityClient.fetch(query);
    const { theme } = themeData;
    this.theme = theme;
  }, */
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.splitText();
      // this.$nextTick(() => this.initScrollAni());
      setTimeout(() => {
        this.initScrollAni();
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/ancillary";
</style>
