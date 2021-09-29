<template>
  <div class="ancillary page-wrapper" :style="cssVars">
    <section
      id="ancillary"
      class="ancillary-container section-container white-bg"
    >
      <div class="texture-pull-right">
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="ancillary-content content-block--extra-pad">
        <div class="intro-text-lockup col-12 col-xl-10">
          <h1 data-scroll-reveal class="reveal">{{ title }}</h1>

          <div class="intro-text reveal" data-scroll-reveal>
            <block-content :blocks="text"></block-content>
          </div>
        </div>
      </div>
    </section>
    <corner-logo :show="showUi" :full-color="true" :delay="0.5"></corner-logo>
  </div>
</template>
<script>
import { legalQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    const { pageContent, theme } = pageData;
    return {
      ...pageContent,
      ...theme,
    };
  },
  data() {
    return {
      enquiryPrefill: "",
    };
  },
  mounted() {
    this.enquiryPrefill = this.$route.params.enquiry;
    console.log(this.$route.params);
    this.$nextTick(this.init);
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
