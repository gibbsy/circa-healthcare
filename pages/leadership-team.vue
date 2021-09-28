<template>
  <div class="team page-wrapper" :style="cssVars">
    <section class="page-hero-container v-centered full-color">
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
        class="team-headline content-block title-reveal"
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
    <section class="team-list-container section-container white-bg">
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
      <div class="team-content content-block--extra-pad v-space-normal">
        <h6 data-scroll-reveal class="section-label reveal col-12">
          {{ introLabel }}
        </h6>
        <article class="row reveal" data-scroll-reveal>
          <div class="team-intro intro-col intro-lg col-12 col-lg-6">
            <block-content :blocks="introSubhead"></block-content>
          </div>
          <div class="team-intro intro-col col-12 col-lg-6">
            <block-content :blocks="introBody"></block-content>
          </div>
        </article>
        <ul class="team-list col-12">
          <li
            v-for="(item, i) in teamMembers"
            :key="i"
            class="team-member reveal"
            data-scroll-reveal
          >
            <figure
              class="team-portrait"
              :style="{
                backgroundImage: `url('${urlFor(item.image)
                  .width(500)
                  .height(500)
                  .auto('format')
                  .quality(70)
                  .url()}')`,
              }"
            ></figure>

            <div class="team-member-details">
              <h5 class="team-name">
                {{ item.name
                }}<span v-if="item.qualifications" class="qualifications">
                  {{ item.qualifications }}</span
                >
              </h5>
              <p class="job-title">{{ item.jobTitle }}</p>
              <a class="team-linkedin" :href="item.linkedin"
                >Linkedin profile</a
              >
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="team-cta-container section-container full-color cta-block">
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
      <div class="team-cta content-block--extra-pad v-space-narrow centered">
        <h3 class="reveal" data-scroll-reveal>{{ ctaHeadline }}</h3>
        <cta-btn class="cta-primary" :slug="ctaBtn.slug">{{
          ctaBtn.title
        }}</cta-btn>
      </div>
    </section>
  </div>
</template>
<script>
import { teamQuery as query } from "../data/queries";
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
@import "../assets/style/pages/team";
</style>
