<template>
  <div class="clients page-wrapper" :style="cssVars">
    <section class="page-hero-container v-centered">
      <div
        :class="['inner-texture', theme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.6"
      ></div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
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
    <transition appear name="fade">
      <div
        ref="logo-peel"
        class="circa-logo logo-corner-left"
        aria-label="Circa logo"
      >
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
    </transition>

    <section class="clients-list-container section-container white-bg">
      <div
        class="texture-pull-left reveal-slide-in"
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
        class="texture-pull-right reveal-slide-in"
        data-scroll-reveal
        data-reveal-start="top center"
      >
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="-0.2"
        ></div>
      </div>
      <div class="clients-content content-block--extra-pad v-space-wide">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ introLabel }}
        </h6>
        <article class="row reveal" data-scroll-reveal>
          <div class="clients-intro intro-lg col-12 col-lg-6">
            <block-content :blocks="introSubhead"></block-content>
          </div>
          <div class="clients-intro col-12 col-lg-6">
            <block-content :blocks="introBody"></block-content>
          </div>
        </article>
        <div class="client-logo-grid" data-scroll-reveal>
          <figure
            v-for="(client, i) in clientList"
            :key="i"
            class="client-logo flex--centred"
          >
            <img
              :src="
                imgRes.width > 1
                  ? urlFor(client.logo)
                      .width('200')
                      .auto('format')
                      .saturation(-100)
                      .quality(80)
                      .url()
                  : ''
              "
              :alt="client.name"
            />
          </figure>
        </div>
      </div>
    </section>
    <section
      class="clients-cta-container section-container full-color cta-block"
    >
      <div
        :class="['inner-texture', theme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.4"
      ></div>
      <div class="texture-pull-left">
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="texture-pull-right">
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="clients-cta content-block--extra-pad v-space-narrow centered">
        <h3 class="reveal semibold" data-scroll-reveal>{{ ctaHeadline }}</h3>
        <cta-btn class="cta-primary" :slug="ctaBtn.slug">{{
          ctaBtn.title
        }}</cta-btn>
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
