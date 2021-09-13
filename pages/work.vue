<template>
  <div class="work page-wrapper" :style="cssVars">
    <div class="page-hero-container">
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
      <div class="work-hero-content">
        <h1>{{ heroHeadline }}</h1>
      </div>
      <scroll-prompt></scroll-prompt>
    </div>
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
    <h4>{{ introLabel }}</h4>
    <block-content :blocks="introBody"></block-content>
    <div class="work-container">
      <div class="work-content">
        <div class="work-label">
          <h3>{{ workLabel }}</h3>
        </div>
        <div class="work-list">
          <div
            v-for="project in work"
            :key="project.title"
            class="case-study-listing"
          >
            <h3>{{ project.title }}</h3>
            <button class="primary">View case study</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { workQuery as query } from "../data/queries";
import Logo from "~/assets/circa_logo_nofill.svg?inline";

export default {
  components: [Logo],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    console.log(pageData.theme);
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
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/work";
</style>
