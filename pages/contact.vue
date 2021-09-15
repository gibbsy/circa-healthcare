<template>
  <div class="contact page-wrapper" :style="cssVars">
    <section
      id="contact"
      class="contact-container section-container white-bg"
      :style="cssVars.whatWeDo"
    >
      <div class="texture-pull-left">
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="texture-pull-right">
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="section-hero-image-wrapper contact" data-scroll-reveal>
        <figure
          class="section-hero-image-inner contact"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(contactImage)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 2)
                    )
                    .auto('format')
                    .quality(80)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="contact-content content-block">
        <div class="intro-text-lockup col-12 col-md-8 col-xl-7">
          <h6 data-scroll-reveal class="section-label reveal">
            {{ pageLabel }}
          </h6>
          <div
            class="headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <block-content
              :blocks="heroHeadline"
              :serializers="serializers"
            ></block-content>
          </div>
          <div class="intro-text reveal" data-scroll-reveal>
            <block-content :blocks="introBody"></block-content>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { contactQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    const { pageContent, contactDetails } = pageData;
    return {
      ...pageContent,
      ...contactDetails,
    };
  },
  mounted() {
    this.$nextTick(this.init);
  },
  methods: {
    init() {
      this.splitText();
      // this.$nextTick(() => this.initScrollAni());
      setTimeout(() => {
        this.initScrollAni();
      }, 50);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/clients";
</style>
