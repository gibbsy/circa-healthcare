<template>
  <transition name="fade" appear>
    <div
      v-if="cssVars.hasOwnProperty('--primary-color')"
      class="what-we-do page-wrapper"
      :style="cssVars"
    >
      <section class="page-hero-container x2-h">
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.3"
        ></div>
        <div class="texture-pull-right">
          <div
            :class="['inner-texture', theme.texture]"
            data-scroll-parallax
            data-scroll-speed="-0.3"
          ></div>
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
          <div class="content-inner col-12 col-md-8 col-lg-7">
            <h2 data-scroll-reveal class="reveal">{{ introSubhead }}</h2>
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
      <section class="wwd-services section-container white-bg">
        <div
          class="texture-pull-left tex-slide-in"
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
          class="texture-pull-right tex-slide-in"
          data-scroll-reveal
          data-reveal-start="top center"
        >
          <div
            :class="['inner-texture', theme.texture]"
            data-scroll-parallax
            data-scroll-speed="-0.2"
          ></div>
        </div>
        <div class="wwd-services-content content-block--extra-pad v-space-wide">
          <h6 data-scroll-reveal class="section-label reveal col-12">
            {{ servicesLabel }}
          </h6>

          <div class="service-list-container row">
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
          <div class="services-cta-container row" data-scroll-reveal>
            <p
              class="flex-col-12 flex-col-lg-7 callout"
              data-scroll-reveal
              data-reveal-start="top bottom-=400"
            >
              {{ servicesCta }}
            </p>
            <div class="flex--centred flex-col-12 flex-col-lg-4">
              <cta-btn class="cta-primary" :slug="servicesCtaBtn.slug">{{
                servicesCtaBtn.title
              }}</cta-btn>
            </div>
          </div>
        </div>
      </section>
      <section class="wwd-clients section-container full-color">
        <div
          class="texture-pull-left tex-slide-in"
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
          class="texture-pull-right tex-slide-in"
          data-scroll-reveal
          data-reveal-start="top center"
        >
          <div
            :class="['inner-texture', theme.texture]"
            data-scroll-parallax
            data-scroll-speed="-0.2"
          ></div>
        </div>
        <div class="content-block v-space-wide">
          <h6 data-scroll-reveal class="section-label col-12 reveal">
            {{ clientsLabel }}
          </h6>
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
          <div class="cta-centred-container">
            <cta-btn class="cta-primary" :slug="clientsCta.slug">{{
              clientsCta.title
            }}</cta-btn>
          </div>
        </div>
      </section>
      <section class="wwd-philanthropy section-container white-bg">
        <div
          class="texture-pull-left tex-slide-in"
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
          class="texture-pull-right tex-slide-in"
          data-scroll-reveal
          data-reveal-start="top center"
        >
          <div
            :class="['inner-texture', theme.texture]"
            data-scroll-parallax
            data-scroll-speed="-0.2"
          ></div>
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
            class="philanthropy-intro intro-lg col-12 col-lg-7 offset-lg-3"
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
              <figure class="list-item-logo flex-col-6 flex-col-md-3">
                <img
                  :src="
                    imgRes.width > 1
                      ? urlFor(item.logo)
                          .width('200')
                          .auto('format')
                          .saturation(-100)
                          .quality(80)
                          .url()
                      : ''
                  "
                  :alt="item.name"
                />
              </figure>
              <div class="list-item-text flex-col-12 flex-col-lg-7">
                <h4 class="partner-name">{{ item.name }}</h4>
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
@import "../assets/style/pages/what-we-do";
</style>
