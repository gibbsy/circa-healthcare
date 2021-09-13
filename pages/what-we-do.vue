<template>
  <div class="what-we-do page-wrapper" :style="cssVars">
    <div class="page-hero-container x2-h">
      <div
        :class="['inner-texture', theme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.5"
      ></div>
      <div class="texture-pull-right">
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="content-block wwd-headline" :style="`--block-height: 100vh`">
        <h1>{{ heroHeadline }}</h1>
      </div>
      <scroll-prompt></scroll-prompt>
      <div class="content-block wwd-intro" :style="`--block-height: 100vh`">
        <div class="content-inner col-12 col-md-8 col-lg-7">
          <h2 data-scroll-reveal class="reveal">{{ introSubhead }}</h2>
          <div data-scroll-reveal class="reveal">
            <block-content :blocks="introBody"></block-content>
          </div>
        </div>
      </div>
    </div>
    <div class="wwd-services section-container white-bg">
      <div
        class="texture-pull-left"
        data-scroll-reveal
        data-reveal-start="top center"
      >
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div
        class="texture-pull-right"
        data-scroll-reveal
        data-reveal-start="top center"
      >
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="-0.2"
        ></div>
      </div>
      <div class="wwd-services-content content-block--column">
        <h6 data-scroll-reveal class="section-label">{{ servicesLabel }}</h6>

        <div class="service-list-container flex-grid-container">
          <div
            v-for="(item, i) in servicesList"
            :key="i"
            class="service-item flex-col-12 flex-col-md-4"
            data-scroll-reveal
          >
            <figure
              class="service-icon"
              :style="{ backgroundImage: `url(${urlFor(item.icon)})` }"
              data-scroll
            ></figure>
            <h3 class="service-title">{{ item.title }}</h3>
            <block-content :blocks="item.text"></block-content>
          </div>
        </div>
        <div class="flex-grid-container services-cta">
          <p class="col-12 col-lg-7 callout" data-scroll-reveal>
            {{ servicesCta }}
          </p>
          <div class="flex--centred col-12 col-lg-4">
            <cta-btn class="cta-primary" :slug="servicesCtaBtn.slug">{{
              servicesCtaBtn.title
            }}</cta-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanityClient";
import { whatWeDoQuery as query } from "../data/queries";
import scrollAnimations from "~/mixins/scrollAnimations";
const urlBuilder = imageUrlBuilder(sanityClient);

export default {
  mixins: [scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    console.log(pageData);
    return {
      ...pageData,
    };
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": this.theme.primaryColor.value,
        "--secondary-color": this.theme.secondaryColor.value,
        "--bg-texture": `var(--tex-${this.theme.texture});`,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    urlFor(source) {
      return urlBuilder.image(source);
    },
    init() {
      this.$nextTick(() => this.initScrollAni());
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/what-we-do";
</style>
