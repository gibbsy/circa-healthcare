<template>
  <div class="join page-wrapper" :style="cssVars">
    <section class="page-hero-container x2-h full-color">
      <div
        class="texture-wrapper parallax cover"
        data-scroll-parallax
        data-scroll-speed="0.5"
      >
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div
        class="join-headline content-block title-reveal v-centered"
        :style="`--block-height: 100vh`"
        data-splitting
        data-scroll-reveal
      >
        <block-content
          :blocks="heroHeadline"
          :serializers="serializers"
        ></block-content>
        <scroll-prompt></scroll-prompt>
      </div>
      <div
        class="content-block join-intro v-centered"
        :style="`--block-height: 100vh`"
      >
        <div class="intro-text-lockup col-12 col-md-10 col-xl-7">
          <h6 data-scroll-reveal class="section-label full-width reveal">
            {{ introLabel }}
          </h6>
          <div data-scroll-reveal class="reveal">
            <block-content :blocks="introBody"></block-content>
          </div>
          <cta-btn
            :external="ctaBtn.external"
            :url="ctaBtn.url"
            :slug="ctaBtn.slug"
            >{{ ctaBtn.title }}</cta-btn
          >
        </div>
      </div>
    </section>
    <corner-logo :show="showUi"></corner-logo>
    <section class="values-container section-container white-bg xl-align-c">
      <div
        class="texture-pull-left reveal-slide-in"
        data-scroll-reveal
        data-reveal-start="top center"
      >
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div
        class="texture-pull-right reveal-slide-in"
        data-scroll-reveal
        data-reveal-start="top center"
      >
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="join-content content-block--extra-pad v-space-normal">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ valuesLabel }}
        </h6>

        <ul class="icon-list-container values row">
          <li
            v-for="(item, i) in valuesList"
            :key="i"
            class="icon-lockup flex-col-12 flex-col-md-6"
            data-scroll-reveal
          >
            <figure class="icon-lockup-icon">
              <nuxt-img :src="item.icon.asset._ref" />
            </figure>
            <div class="icon-lockup-text">
              <h3 class="icon-lockup-title">{{ item.title }}</h3>
              <block-content :blocks="item.text"></block-content>
            </div>
          </li>
        </ul>
        <h6
          v-if="showVacancies"
          data-scroll-reveal
          class="section-label vacancies-label reveal col-12"
        >
          {{ vacanciesLabel }}
        </h6>
        <!--    <div data-scroll-reveal class="vacancies-intro reveal col-12 col-md-8">
          <block-content :blocks="vacanciesIntro"></block-content>
        </div> -->
        <ul v-if="showVacancies" class="vacancies-list-container row">
          <li
            v-for="(item, i) in jobVacancies"
            :key="i"
            class="vacancy-listing flex-col-12 reveal"
            data-scroll-reveal
          >
            <div class="job-title-lockup">
              <h3 class="job-title">{{ item.title }}</h3>
              <p class="job-location">{{ item.location }}</p>
            </div>
            <a :href="`${item.pdf}?dl=`" class="download-description"
              ><pdf-icon class="icon-pdf" />Job description</a
            >
            <nuxt-link
              :to="{
                name: 'contact',
                params: { enquiry: 'careers' },
              }"
              class="cta-primary"
              ><span class="arrow"><cta-arrow /></span>Apply now</nuxt-link
            >
          </li>
        </ul>
      </div>
    </section>
    <section
      class="
        join-cta-container
        section-container
        full-color
        cta-block
        xl-align-c
      "
    >
      <div
        class="texture-wrapper cover parallax"
        data-scroll-parallax
        data-scroll-speed="0.5"
      >
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div
        class="section-hero-image-wrapper reveal-slide-in"
        data-scroll-reveal
      >
        <figure class="section-hero-image">
          <nuxt-img
            :sizes="imgSizes.promo"
            :modifiers="{ crop: ctaImage.crop }"
            :src="ctaImage.asset._ref"
            :alt="ctaImage.title"
            quality="70"
          />
        </figure>
      </div>

      <div class="join-cta content-block v-space-narrow v-centered">
        <p class="callout col-12 col-lg-8 reveal" data-scroll-reveal>
          {{ ctaText }}
        </p>
        <cta-btn
          :external="ctaBtn.external"
          :url="ctaBtn.url"
          :slug="ctaBtn.slug"
          >{{ ctaBtn.title }}</cta-btn
        >
      </div>
    </section>
  </div>
</template>
<script>
import { joinUsQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";
import PdfIcon from "~/assets/icon_pdf.svg?inline";

export default {
  components: { CtaArrow, PdfIcon },
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
  computed: {
    showVacancies() {
      if (!this.jobVacancies) {
        return false;
      }
      return this.jobVacancies.length > 0;
    },
  },
  watch: {
    showVacancies() {
      this.$nextTick(() => {
        ScrollTrigger.refresh();
      });
    },
  },
  mounted() {
    this.$store.commit("setFullColor", true);
    this.init();
  },
  methods: {
    init() {
      this.splitText();
      this.$nextTick(() => this.initScrollAni());
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/join-us";
</style>
