<template>
  <transition name="fade" appear>
    <div class="what-we-do page-wrapper" :style="cssVars">
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
          class="wwd-headline content-block title-reveal v-centered"
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
        <div class="content-block wwd-intro" :style="`--block-height: 100vh`">
          <div class="content-inner col-12 col-md-10 col-xl-7">
            <h2 data-scroll-reveal class="reveal">{{ introSubhead }}</h2>
            <div data-scroll-reveal class="reveal">
              <block-content :blocks="introBody"></block-content>
            </div>
          </div>
        </div>
      </section>
      <corner-logo :show="showUi"></corner-logo>
      <section class="wwd-services section-container white-bg xl-align-c">
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
        <div class="wwd-services-content content-block--extra-pad v-space-wide">
          <h6 data-scroll-reveal class="section-label reveal col-12">
            {{ servicesLabel }}
          </h6>

          <ul class="icon-list-container row">
            <li
              v-for="(item, i) in servicesList"
              :key="i"
              class="icon-lockup services flex-col-12 flex-col-lg-4"
              data-scroll-reveal
            >
              <figure class="icon-lockup-icon">
                <nuxt-img :src="item.icon.asset._ref" />
              </figure>
              <h3 class="icon-lockup-title">{{ item.title }}</h3>
              <block-content :blocks="item.text"></block-content>
            </li>
          </ul>
          <div class="services-cta-container row" data-scroll-reveal>
            <p
              class="flex-col-12 flex-col-lg-7 callout"
              data-scroll-reveal
              data-reveal-start="top bottom-=400"
            >
              {{ servicesCta }}
            </p>
            <div class="services-cta-btn-container flex-col-12 flex-col-lg-4">
              <cta-btn class="cta-primary" :slug="servicesCtaBtn.slug">{{
                servicesCtaBtn.title
              }}</cta-btn>
            </div>
          </div>
        </div>
      </section>
      <section class="wwd-clients section-container full-color xl-align-c">
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
        <div class="content-block v-space-wide">
          <h6 data-scroll-reveal class="section-label col-12 reveal">
            {{ clientsLabel }}
          </h6>
          <div class="client-logo-grid" data-scroll-reveal>
            <figure
              v-for="(client, i) in clientList"
              :key="i"
              class="client-logo"
            >
              <nuxt-img
                :sizes="imgSizes.clients"
                :src="client.logoWhite.asset._ref"
                :alt="client.name"
                quality="80"
              />
            </figure>
          </div>
          <div class="cta-centred-container">
            <cta-btn class="cta-primary" :slug="clientsCta.slug">{{
              clientsCta.title
            }}</cta-btn>
          </div>
        </div>
      </section>
      <section class="wwd-philanthropy section-container white-bg xl-align-c">
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
        <div
          class="
            wwd-philanthropy-content
            content-block--extra-pad
            v-space-normal
          "
        >
          <h6 data-scroll-reveal class="section-label reveal col-11">
            {{ philanthropyLabel }}
          </h6>
          <article
            class="philanthropy-intro intro-lg col-12 col-xl-8 offset-xl-3"
          >
            <block-content :blocks="philanthropyIntro"></block-content>
          </article>
          <ul class="philanthropy-list-container">
            <li
              v-for="(item, i) in philanthropyList"
              :key="i"
              class="list-item horizontal-list-lockup"
              data-scroll-reveal
            >
              <figure
                class="list-item-logo flex-col-3 flex-col-xl-2 offset-xl-1"
              >
                <a v-if="item.href" :href="item.href" target="_blank">
                  <nuxt-img
                    :sizes="imgSizes.clients"
                    :src="item.logo.asset._ref"
                    :alt="item.name"
                    quality="80"
                  />
                </a>
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
        </div>
      </section>
    </div>
  </transition>
</template>
<script>
import { whatWeDoQuery as query } from "../data/queries";
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
@import "../assets/style/pages/what-we-do";
</style>
