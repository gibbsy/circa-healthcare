<template>
  <div class="clients page-wrapper" :style="cssVars">
    <section class="page-hero-container full-color v-centered">
      <div
        class="texture-wrapper parallax cover"
        data-scroll-parallax
        data-scroll-speed="0.6"
      >
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div
        class="clients-headline content-block title-reveal"
        data-splitting
        data-scroll-reveal
      >
        <block-content
          :blocks="heroHeadline"
          :serializers="serializers"
        ></block-content>
      </div>
      <scroll-prompt></scroll-prompt>
    </section>
    <corner-logo :show="showUi"></corner-logo>
    <section
      class="clients-list-container section-container white-bg xl-align-c"
    >
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
      <div class="clients-content content-block--extra-pad v-space-wide">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ introLabel }}
        </h6>
        <article class="row reveal" data-scroll-reveal>
          <div class="clients-intro intro-col intro-lg col-12 col-lg-6">
            <block-content :blocks="introSubhead"></block-content>
          </div>
          <div class="clients-intro intro-col col-12 col-lg-6">
            <block-content :blocks="introBody"></block-content>
          </div>
        </article>
        <div class="client-logo-grid" data-scroll-reveal>
          <figure
            v-for="(client, i) in clientList"
            :key="i"
            class="client-logo flex--centred"
          >
            <nuxt-img
              :sizes="imgSizes.clients"
              :src="client.logo.asset._ref"
              :alt="client.name"
              quality="80"
            />
          </figure>
        </div>
      </div>
    </section>
    <section
      class="
        clients-cta-container
        section-container
        full-color
        cta-block
        xl-align-c
      "
    >
      <div
        class="texture-wrapper parallax cover"
        data-scroll-parallax
        data-scroll-speed="0.4"
      >
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="texture-pull-left">
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="texture-pull-right">
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="clients-cta content-block--extra-pad v-space-narrow centered">
        <h3 class="reveal semibold" data-scroll-reveal>{{ ctaHeadline }}</h3>
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
import { clientsQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    const { pageContent, clientList } = pageData;
    return {
      ...pageContent,
      ...clientList,
    };
  },
  mounted() {
    this.$store.commit("setFullColor", true);
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
@import "../assets/style/pages/clients";
</style>
