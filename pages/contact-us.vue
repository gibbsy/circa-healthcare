<template>
  <div class="contact page-wrapper" :style="cssVars">
    <section
      id="contact"
      class="contact-container section-container white-bg"
      :style="cssVars"
    >
      <div class="texture-pull-right">
        <div class="texture-wrapper">
          <div :class="['inner-texture', theme.texture]"></div>
        </div>
      </div>
      <div class="section-hero-image-wrapper contact" data-scroll-reveal>
        <figure class="section-hero-image contact">
          <nuxt-img
            :sizes="imgSizes.promo"
            :modifiers="{ crop: contactImage.crop }"
            :src="contactImage.asset._ref"
            :alt="contactImage.title"
          />
        </figure>
      </div>
      <div class="contact-content content-block">
        <div class="intro-text-lockup col-12 col-lg-7">
          <h6 data-scroll-reveal class="section-label reveal">
            {{ pageLabel }}
          </h6>
          <div
            class="headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <block-content
              :blocks="heroHeadline"
              :serializers="serializers"
            ></block-content>
          </div>
          <div class="intro-text reveal" data-scroll-reveal>
            <block-content :blocks="introBody"></block-content>
          </div>
        </div>
        <div class="contact-details row reveal" data-scroll-reveal>
          <contact-form :enquiry-prefill="enquiryPrefill"></contact-form>
          <div class="contacts-container">
            <div
              v-for="location in contactDetails"
              :key="location.name"
              class="contacts-item"
            >
              <h6>{{ location.name }}</h6>
              <a class="email" :href="`mailto:${location.email}`">{{
                location.email
              }}</a>
              <a :href="`tel:${location.phone}`">{{ location.phone }}</a>
              <div class="address">
                <block-content :blocks="location.address"></block-content>
              </div>
            </div>
            <div class="contacts-item social">
              <h6>Social</h6>
              <ul class="socials-menu">
                <li v-for="link in socials" :key="link.title">
                  <a :href="link.href">{{ link.title }}></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <corner-logo :show="showUi" :full-color="true" :delay="0.5"></corner-logo>
  </div>
</template>
<script>
import { contactQuery as query } from "../data/queries";
import sanityClient from "../sanityClient";
import pageSetup from "~/mixins/pageSetup";
import scrollAnimations from "~/mixins/scrollAnimations";

export default {
  mixins: [pageSetup, scrollAnimations],
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    const { pageContent, contactDetails } = pageData;
    return {
      ...pageContent,
      ...contactDetails,
    };
  },
  data() {
    return {
      enquiryPrefill: "",
    };
  },
  mounted() {
    this.$store.commit("setFullColor", false);
    this.enquiryPrefill = this.$route.params.enquiry;
    console.log(this.$route.params);
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
@import "../assets/style/pages/contact";
</style>
