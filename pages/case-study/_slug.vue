<template>
  <div class="case-study page-wrapper" :style="cssVars">
    <section
      id="case-study"
      class="case-study-container section-container white-bg"
      :style="cssVars.whatWeDo"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', theme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>

      <div class="case-study-content content-block--extra-pad v-space-wide">
        <div class="case-study-info-lockup row">
          <div class="intro-text-lockup col-12 col-md-6">
            <div
              class="headline-container title-reveal"
              data-splitting
              data-scroll-reveal
            >
              <h1 class="case-study-title">{{ title }}</h1>
            </div>
            <div class="case-study-credits row reveal" data-scroll-reveal>
              <div class="credit">
                <h6>Client</h6>
                <h5>{{ client.name }}</h5>
              </div>
              <div class="credit">
                <h6>Product</h6>
                <h5>{{ product }}</h5>
              </div>
            </div>
            <div class="intro-text reveal" data-scroll-reveal>
              <article class="case-study-problem">
                <h5 class="subhead">What was the challenge?</h5>
                <block-content :blocks="problem"></block-content>
              </article>
              <article class="case-study-solution">
                <h5 class="subhead">How did we solve it?</h5>
                <block-content :blocks="solution"></block-content>
              </article>
              <aside class="case-study-deliverables reveal" data-scroll-reveal>
                <h5 class="subhead">What we delivered</h5>
                <ul class="deliverables-list">
                  <li v-for="item in deliverables" :key="item">{{ item }}</li>
                </ul>
              </aside>
            </div>
          </div>
          <div class="right-col flex-col-12 flex-col-md-6">
            <div
              class="case-study-hero-image-wrapper reveal"
              data-scroll-reveal
            >
              <figure>
                <nuxt-img :sizes="imgSizes.hero" :src="hero.asset._id" />
              </figure>
            </div>
            <aside class="case-study-deliverables reveal" data-scroll-reveal>
              <h5 class="subhead">What we delivered</h5>
              <ul class="deliverables-list">
                <li v-for="item in deliverables" :key="item">{{ item }}</li>
              </ul>
            </aside>
          </div>
        </div>
        <div class="case-study-images v-space-wide">
          <figure
            v-for="(image, i) in projectImages"
            :key="i"
            data-scroll-reveal
            class="reveal"
          >
            <!-- <img :src="urlFor(image).url()" :alt="image.title" /> -->
            <nuxt-img
              :sizes="imgSizes.content"
              :src="image.asset._id"
              loading="lazy"
              quality="50"
            />
            <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
          </figure>
        </div>
      </div>
      <corner-logo :show="showUi" :full-color="true"></corner-logo>
    </section>
    <section class="work-back-container section-container full-color cta-block">
      <div
        :class="['inner-texture', theme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.4"
      ></div>
      <!--    <div class="texture-pull-left">
        <div :class="['inner-texture', theme.texture]"></div>
      </div>
      <div class="texture-pull-right">
        <div :class="['inner-texture', theme.texture]"></div>
      </div> -->
      <div class="team-cta content-block--extra-pad v-space-narrow centered">
        <cta-btn class="cta-primary" slug="/work">Back to all work</cta-btn>
      </div>
    </section>
  </div>
</template>
<script>
import sanityClient from "~/sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";
export default {
  name: "Contact",
  mixins: [pageSetup, scrollAnimations],
  async asyncData({ params }) {
    const query = `{
      "theme": *[_id=="pageWork"][0]{theme},
      "caseStudy": *[_type == "caseStudy" && slug.current == "${params.slug}"][0]
      {title, hero{asset->}, client->{name}, product,  problem, solution, deliverables, projectImages[]{title, caption, asset->}}
}`;
    const pageData = await sanityClient.fetch(query);
    console.log(pageData);
    const { theme, caseStudy } = pageData;
    return { ...theme, ...caseStudy };
  },
  computed: {
    imgSizes() {
      return this.$store.state.imgSizes;
    },
  },
  mounted() {
    this.$nextTick(this.init);
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
@import "~/assets/style/pages/case-study";
</style>
