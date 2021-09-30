<template>
  <div class="work page-wrapper" :style="cssVars">
    <section class="page-hero-container full-color x2-h">
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
        class="work-headline content-block title-reveal v-centered"
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
        class="content-block work-intro v-centered"
        :style="`--block-height: 100vh`"
      >
        <div class="intro-text-lockup col-12 col-md-10 col-lg-8 col-xl-7">
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
    <section class="case-studies-container section-container white-bg">
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
        class="texture-pull-right"
        data-scroll-reveal
        data-reveal-start="top center"
        data-scroll-parallax
        data-scroll-speed="0.3"
        data-scroll-direction="horizontal"
      >
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="case-studies-content content-block v-space-normal">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ workLabel }}
        </h6>
        <ul class="project-list-container">
          <li
            v-for="(project, i) in work"
            :key="i"
            class="case-study-listing horizontal-list-lockup reveal"
            data-scroll-reveal
          >
            <div class="project-details-lockup flex-col-12 flex-col-md-6">
              <h5 class="client-name">{{ project.client.name }}</h5>
              <h2 class="project-title">{{ project.title }}</h2>
              <nuxt-link
                class="cta-primary reveal"
                :to="`case-study/${project.slug.current}`"
                data-scroll-reveal
                ><span class="arrow"> <cta-arrow /> </span>View case study
              </nuxt-link>
            </div>
            <figure
              class="
                project-hero-image-container
                flex-col-12 flex-col-md-5
                offset-md-1
              "
            >
              <!-- <img
                :src="
                  imgRes.width > 1
                    ? urlFor(project.hero)
                        .width('200')
                        .auto('format')
                        .quality(80)
                        .url()
                    : ''
                "
              /> -->
              <nuxt-link :to="`case-study/${project.slug.current}`">
                <img
                  :src="
                    imgRes.width > 1
                      ? urlFor(project.hero)
                          .width(
                            isMobile && imgRes.width < 1000
                              ? imgRes.width
                              : Math.floor(imgRes.width / 2)
                          )
                          .auto('format')
                          .quality(80)
                          .url()
                      : ''
                  "
                />
              </nuxt-link>
            </figure>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { workQuery as query } from "../data/queries";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

export default {
  components: { CtaArrow },
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    console.log(pageData.theme);
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
      setTimeout(() => {
        this.initScrollAni();
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/work";
</style>
