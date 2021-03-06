<template>
  <div class="partnerships page-wrapper" :style="cssVars">
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
        class="partnerships-headline content-block title-reveal v-centered"
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
        class="content-block partnerships-intro v-centered"
        :style="`--block-height: 100vh`"
      >
        <div class="intro-text-lockup col-12 col-md-10 col-xl-7">
          <h6 data-scroll-reveal class="section-label full-width reveal">
            {{ introLabel }}
          </h6>
          <div data-scroll-reveal class="reveal">
            <block-content :blocks="introBody"></block-content>
          </div>
        </div>
      </div>
    </section>
    <corner-logo :show="showUi"></corner-logo>
    <section class="partners-container section-container white-bg xl-align-c">
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
      <div class="partners-content content-block--extra-pad v-space-normal">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ partnerLabel }}
        </h6>

        <ul class="partner-list">
          <li
            v-for="(item, i) in partners"
            :key="i"
            class="list-item horizontal-list-lockup"
            data-scroll-reveal
          >
            <figure class="list-item-logo col-6 flex-col-md-3">
              <a v-if="item.href" :href="item.href" target="_blank">
                <nuxt-img
                  :sizes="imgSizes.clients"
                  :src="item.logo.asset._ref"
                  :alt="item.name"
                  quality="80"
              /></a>
              <nuxt-img
                v-else
                :sizes="imgSizes.clients"
                :src="item.logo.asset._ref"
                :alt="item.name"
                quality="80"
              />
            </figure>
            <div class="list-item-text flex-col-12 flex-col-lg-7">
              <a
                v-if="item.href"
                class="partner-url"
                :href="item.href"
                target="_blank"
                ><h4 class="partner-name">{{ item.name }}</h4></a
              >
              <h4 v-else class="partner-name">{{ item.name }}</h4>
              <block-content :blocks="item.text"></block-content>
            </div>
          </li>
        </ul>
        <!--         <article class="partners-cta col-12 col-lg-7 offset-lg-3">
          <block-content :blocks="partnershipSummary"></block-content>
        </article> -->
      </div>
    </section>
  </div>
</template>
<script>
import { partnershipsQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
  mounted() {
    this.$store.commit("setFullColor", true);
    this.init();
  },
  methods: {
    init() {
      this.splitText();
      setTimeout(() => {
        this.initScrollAni();
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/partnerships";
</style>
