<template>
  <div class="ancillary page-wrapper">
    <section
      id="ancillary"
      class="ancillary-container section-container white-bg"
    >
      <div class="ancillary-content content-block--extra-pad error-content">
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
    <corner-logo :show="true" :full-color="true" :delay="0.5"></corner-logo>
  </div>
</template>
<script>
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  components: { CtaArrow },
  mixins: [scrollAnimations],
  mounted() {
    this.init();
  },
  methods: {
    init() {
      setTimeout(() => {
        this.initScrollAni();
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.error-content {
  min-height: 70vh;
  justify-content: center;
}
</style>
