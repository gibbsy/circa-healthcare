<template>
  <div class="join page-wrapper" :style="cssVars">
    <section class="page-hero-container x2-h">
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
        <div class="intro-text-lockup col-12 col-md-8 col-lg-7">
          <h6 data-scroll-reveal class="section-label full-width reveal">
            {{ introLabel }}
          </h6>
          <div data-scroll-reveal class="reveal">
            <block-content :blocks="introBody"></block-content>
          </div>
        </div>
      </div>
    </section>
    <transition appear name="fade">
      <figure
        ref="logo-peel"
        class="circa-logo logo-corner-left"
        aria-label="Circa logo"
      >
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </figure>
    </transition>
    <section class="values-container section-container white-bg">
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
      <div class="values-content content-block--extra-pad v-space-normal">
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
            <figure
              class="icon-lockup-icon"
              :style="{ backgroundImage: `url(${urlFor(item.icon)})` }"
              data-scroll
            ></figure>
            <div class="icon-lockup-text">
              <h3 class="icon-lockup-title">{{ item.title }}</h3>
              <block-content :blocks="item.text"></block-content>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="join-cta-container section-container white-bg cta-block">
      <div
        class="section-hero-image-wrapper reveal-slide-in"
        data-scroll-reveal
      >
        <figure
          class="section-hero-image-inner"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(ctaImage)
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

      <div class="join-cta content-block v-space-narrow v-centered">
        <p class="callout col-12 col-lg-8 reveal" data-scroll-reveal>
          {{ ctaText }}
        </p>
        <cta-btn class="cta-primary" :slug="ctaBtn.slug">{{
          ctaBtn.title
        }}</cta-btn>
      </div>
    </section>
  </div>
</template>
<script>
import { joinUsQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    console.log(pageData);
    return {
      ...pageData,
    };
  },
  mounted() {
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
