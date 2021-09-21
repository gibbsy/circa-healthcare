<template>
  <div
    class="contact-full-screen-container section-container full-color"
    :style="cssVars"
  >
    <div :class="['inner-texture']"></div>
    <div
      :class="['texture-pull-left', 'reveal-slide-in', { 'is-inview': inView }]"
    >
      <div class="inner-texture"></div>
    </div>
    <div
      :class="[
        'texture-pull-right',
        'reveal-slide-in',
        { 'is-inview': inView },
      ]"
    >
      <div
        class="inner-texture"
        data-scroll-parallax
        data-scroll-speed="0.5"
      ></div>
    </div>
    <div class="contact-content content-block">
      <div class="intro-text-lockup col-12 col-md-8 col-xl-7">
        <h6 class="section-label reveal">Contact us</h6>
        <div class="headline-container title-reveal" data-splitting>
          <h1><span class="copyline">Get in touch.</span></h1>
        </div>
        <div class="intro-text">
          <block-content :blocks="pageContent.introBody"></block-content>
        </div>
      </div>
      <div class="contact-details row">
        <contact-form></contact-form>
        <div class="contacts-container">
          <div
            v-for="location in contactDetails"
            :key="location.name"
            class="contacts-item"
          >
            <h6>{{ location.name }}</h6>
            <a :href="`mailto:${location.email}`">{{ location.email }}</a>
            <p>{{ location.phone }}</p>
          </div>
          <div class="contacts-item">
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
  </div>
</template>
<script>
import sanityClient from "~/sanityClient";
import { contactQuery as query } from "~/data/queries";

export default {
  /*   props: {
    contactDetails: {
      type: Array,
      default: () => [],
    },
    introBody: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
    clickFn: {
      type: Function,
      default: () => [],
    },
  }, */
  data() {
    return {
      inView: false,
      contactDetails: [],
      socials: [],
      pageContent: [],
    };
  },
  async fetch() {
    const componentData = await sanityClient.fetch(query);
    console.log(componentData);
    this.contactDetails = componentData.contactDetails.contactDetails;
    this.socials = componentData.contactDetails.socials;
    this.pageContent = componentData.pageContent;
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": `var(--dark-blue)`,
        "--secondary-color": `var(--teal)`,
        "--bg-texture": `var(--tex-leaf)`,
      };
    },
  },
  mounted() {
    setTimeout(() => {
      this.inView = true;
    }, 500);
  },
  methods: {
    clickHandler() {
      setTimeout(() => {
        this.clickFn();
      }, 250);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/style/components/contact-overlay";
</style>
