<template>
  <div class="work page-wrapper" :style="cssVars">
    <div class="work-hero-container">
      <div class="texture-pull-right"></div>
      <div class="work-hero-content">
        <h1>{{ heroHeadline }}</h1>
      </div>
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
export default {
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
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/work";
</style>
