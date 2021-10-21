<template>
  <div
    id="page-wrapper"
    ref="page-wrapper"
    :class="['home', 'page-wrapper', { 'is-mobile': isMobile }]"
  >
    <section id="hero" class="hero-container section-container">
      <div
        ref="heroBg"
        class="hero-background"
        data-scroll-parallax
        data-scroll-speed="0.2"
        data-scroll-start="top top"
      >
        <transition name="fade" appear>
          <HeroVideo
            :vimeo-id="hero.heroVideo"
            :ready-fn="onLoad"
            :poster="hero.heroPoster"
          ></HeroVideo>
        </transition>
      </div>
      <div
        id="hero-text"
        :class="[
          'hero-content hero-title title-reveal',
          { 'is-inview': showUi },
        ]"
        data-splitting
      >
        <block-content
          :blocks="hero.mainHeadline"
          :serializers="serializers"
        ></block-content>
      </div>
      <scroll-prompt :mono="true"></scroll-prompt>
    </section>
    <corner-logo :show="showUi" :delay="1.5"></corner-logo>
    <section
      id="intro"
      class="intro-container section-container white-bg v-centered"
      :style="cssVars.intro"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', intro.introTheme.texture]"></div>
        </div>
      </div>
      <div
        class="texture-pull-right reveal-slide-in"
        data-scroll-reveal
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      >
        <div class="texture-wrapper">
          <div :class="['inner-texture', intro.introTheme.texture]"></div>
        </div>
      </div>
      <div
        class="intro-content content-block v-centered reveal"
        data-scroll-reveal
      >
        <article class="intro-text-lockup col-12 col-lg-8 col-xl-7">
          <div data-scroll-reveal>
            <block-content :blocks="intro.intro"></block-content>
          </div>
          <cta-btn class="cta-primary" :slug="intro.introCta.slug">{{
            intro.introCta.title
          }}</cta-btn>
        </article>
      </div>
    </section>
    <section
      id="about"
      ref="about"
      :class="[
        'about-container',
        'section-container',
        'full-color',
        ,
        { 'scroll-ani': !isMobile },
      ]"
      :style="cssVars.about"
      data-scroll-reveal
    >
      <div class="texture-wrapper parallax cover">
        <div :class="['inner-texture', about.aboutTheme.texture]"></div>
      </div>
      <div
        id="about-stat-scroller"
        :class="[
          'stat-scroller-container',
          { 'scroll-ani': !isMobile },
          { 'is-mobile': isMobile },
        ]"
      >
        <div class="stat-scroller-inner">
          <div
            class="headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ about.aboutHeadline }}</h2>
          </div>
          <div class="scroller-transition-wrapper" data-scroll-reveal>
            <div
              id="about-images-container"
              ref="about-images-container"
              class="about-images-container"
            >
              <figure
                v-for="img in about.aboutImages"
                :key="img.title"
                class="about-img"
              >
                <nuxt-img
                  class="inner-image"
                  :sizes="imgSizes.scroller"
                  :modifiers="{ crop: img.crop }"
                  :src="img.asset._ref"
                  :alt="img.title"
                  quality="70"
                />
              </figure>
            </div>
            <div id="about-stats-container" class="about-stats-container">
              <div
                v-for="(stat, i) in about.aboutStats"
                :key="i"
                class="stat-wrapper"
              >
                <h2 class="stat">{{ stat.stat }}</h2>
                <div class="stat-text">
                  <h3>{{ stat.title }}</h3>
                  <p>{{ stat.text }}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="stats-tex-right" class="texture-pull-right">
            <div class="texture-wrapper">
              <div :class="['inner-texture', about.aboutTheme.texture]"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="why-circa"
        :class="[
          'why-circa-container',
          { 'scroll-ani': !isMobile, 'is-mobile': isMobile },
        ]"
      >
        <div id="why-circa-tex" class="texture-pull-left">
          <div class="texture-wrapper">
            <div :class="['inner-texture', about.aboutTheme.texture]"></div>
          </div>
        </div>

        <div
          id="why-label"
          class="headline-container col-lg-4"
          data-scroll-reveal
        >
          <h2>{{ whyCirca.whyLabel }}</h2>
        </div>
        <article
          id="why-circa-content"
          class="why-circa-content col-12 offset-lg-4 offset-huge-5 col-lg-6"
        >
          <div
            v-for="(section, i) in whyCirca.whySections"
            :key="i"
            class="why-section"
            data-scroll-reveal
            data-reveal-start="top bottom-=200px"
          >
            <h3>{{ section.title }}</h3>
            <block-content :blocks="section.text"></block-content>
          </div>
          <cta-btn class="cta-primary" :slug="whyCirca.whyCta.slug">{{
            whyCirca.whyCta.title
          }}</cta-btn>
        </article>
      </div>
    </section>
    <section
      id="work"
      class="
        work-container
        section-container
        img-promo
        white-bg
        img-right
        v-centered
      "
      :style="cssVars.work"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', work.workTheme.texture]"></div>
        </div>
      </div>

      <div
        class="section-hero-image-wrapper work full-height reveal-slide-in"
        data-scroll-reveal
      >
        <figure class="section-hero-image work parallax-image">
          <nuxt-img
            data-scroll-parallax
            data-scroll-speed="0.2"
            :sizes="imgSizes.promo"
            :modifiers="{ crop: work.workImage.crop }"
            :src="work.workImage.asset._ref"
            :alt="work.workImage.title"
            quality="70"
          />
        </figure>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', work.workTheme.texture]"></div>
        </div>
      </div>
      <div class="work-content v-space-wide">
        <div class="intro-text-lockup col-12 col-lg-8 col-xl-7">
          <h6 data-scroll-reveal class="section-label reveal">
            {{ work.workLabel }}
          </h6>
          <div
            class="headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ work.workHeadline }}</h2>
          </div>
          <div class="intro-text reveal" data-scroll-reveal>
            <block-content :blocks="work.workBody"></block-content>
          </div>
          <cta-btn class="cta-primary" :slug="work.workCta.slug">{{
            work.workCta.title
          }}</cta-btn>
        </div>
      </div>
    </section>
    <section
      id="what-we-do"
      class="
        what-we-do-container
        section-container
        img-promo
        white-bg
        img-right
        v-centered
      "
      :style="cssVars.whatWeDo"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', whatWeDo.whatWeDoTheme.texture]"></div>
        </div>
      </div>

      <div
        class="
          section-hero-image-wrapper
          what-we-do
          full-height
          reveal-slide-in
        "
        data-scroll-reveal
      >
        <figure
          class="section-hero-image what-we-do parallax-image"
          :alt="whatWeDo.whatWeDoImage.title"
        >
          <nuxt-img
            data-scroll-parallax
            data-scroll-speed="0.2"
            :sizes="imgSizes.promo"
            :modifiers="{ crop: whatWeDo.whatWeDoImage.crop }"
            :src="whatWeDo.whatWeDoImage.asset._ref"
            :alt="whatWeDo.whatWeDoImage.title"
            quality="70"
          />
        </figure>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', whatWeDo.whatWeDoTheme.texture]"></div>
        </div>
      </div>
      <div class="what-we-do-content v-space-wide">
        <div class="intro-text-lockup col-12 col-lg-8 col-xl-7">
          <h6 data-scroll-reveal class="section-label reveal">
            {{ whatWeDo.whatWeDoLabel }}
          </h6>
          <div
            class="headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ whatWeDo.whatWeDoHeadline }}</h2>
          </div>
          <div class="intro-text reveal" data-scroll-reveal>
            <block-content :blocks="whatWeDo.whatWeDoBody"></block-content>
          </div>
          <cta-btn class="cta-primary" :slug="whatWeDo.whatWeDoCta.slug">{{
            whatWeDo.whatWeDoCta.title
          }}</cta-btn>
        </div>
      </div>
    </section>
    <section
      id="partnerships"
      class="partnerships-container section-container full-color v-centered"
      :style="cssVars.partnerships"
    >
      <div
        class="texture-wrapper parallax cover"
        data-scroll-parallax
        data-scroll-speed="0.2"
      >
        <div
          :class="['inner-texture', partnerships.partnershipsTheme.texture]"
        ></div>
      </div>
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div
            :class="['inner-texture', partnerships.partnershipsTheme.texture]"
          ></div>
        </div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div
            :class="['inner-texture', partnerships.partnershipsTheme.texture]"
          ></div>
        </div>
      </div>

      <div class="partnerships-content">
        <div class="intro-text-lockup col-12 col-lg-8 col-xl-7">
          <h6 class="section-label reveal" data-scroll-reveal>
            {{ partnerships.partnershipsLabel }}
          </h6>
          <p data-scroll-reveal class="callout reveal">
            {{ partnerships.partnershipsText }}
          </p>
          <cta-btn
            class="cta-primary"
            :slug="partnerships.partnershipsCta.slug"
            >{{ partnerships.partnershipsCta.title }}</cta-btn
          >
        </div>
      </div>
    </section>
    <section
      id="team"
      class="team-container section-container full-color v-centered"
      :style="cssVars.team"
    >
      <div
        class="texture-wrapper parallax cover"
        data-scroll-parallax
        data-scroll-speed="0.2"
      >
        <div :class="['inner-texture', meetTheTeam.teamTheme.texture]"></div>
      </div>
      <div
        class="section-hero-image-wrapper full-height pull-left"
        data-scroll-reveal
      >
        <figure
          class="section-hero-image parallax-image"
          :alt="meetTheTeam.teamImage.title"
        >
          <nuxt-img
            data-scroll-parallax
            data-scroll-speed="0.2"
            :sizes="imgSizes.promo"
            :modifiers="{ crop: meetTheTeam.teamImage.crop }"
            :src="meetTheTeam.teamImage.asset._ref"
            :alt="meetTheTeam.teamImage.title"
            quality="60"
          />
        </figure>
      </div>
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', meetTheTeam.teamTheme.texture]"></div>
        </div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div class="texture-wrapper">
          <div :class="['inner-texture', meetTheTeam.teamTheme.texture]"></div>
        </div>
      </div>

      <div class="team-content">
        <div
          class="intro-text-lockup col-12 col-lg-6 offset-lg-6 offset-huge-8"
        >
          <h6 class="section-label reveal" data-scroll-reveal>
            {{ meetTheTeam.teamLabel }}
          </h6>
          <p data-scroll-reveal class="callout reveal">
            {{ meetTheTeam.teamText }}
          </p>
          <cta-btn class="cta-primary" :slug="meetTheTeam.teamCta.slug">{{
            meetTheTeam.teamCta.title
          }}</cta-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanityClient";
import { homeQuery as query } from "../data/queries";
import scrollAnimations from "~/mixins/scrollAnimations";
import copyline from "~/components/span.vue";
const urlBuilder = imageUrlBuilder(sanityClient);

export default {
  mixins: [scrollAnimations],
  transition: {
    name: "fade-pause",
    mode: "out-in",
  },
  async asyncData() {
    const homeData = await sanityClient.fetch(query);
    console.log(homeData);

    return {
      ...homeData.home,
    };
  },
  data() {
    return {
      showUi: false,
      showPrompt: false,
      ready: false,
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  head() {
    const { siteTitle, siteDescription } = this.siteConfig;
    return {
      siteTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: siteDescription,
        },
        {
          property: "og:locale",
          content: "en_GB",
          hid: "og:locale",
        },
        {
          property: "og:type",
          content: "website",
          hid: "og:type",
        },
        {
          property: "og:url",
          content: "https://www.circahealthcare.com",
          hid: "og:url",
        },
        {
          property: "og:site_name",
          content: "Circa Healthcare",
          hid: "og:site_name",
        },
        {
          property: "og:image",
          content: this.urlFor(this.siteConfig.ogImage.asset)
            .width(1200)
            .height(630)
            .url(),
          hid: "og:image",
        },
        {
          property: "og:image:width",
          content: "1200",
          hid: "og:image_width",
        },
        {
          property: "og:image:height",
          content: "630",
          hid: "og:image_width",
        },
        {
          property: "og:title",
          content: siteTitle,
          hid: "og:title",
        },
        {
          property: "og:description",
          content: siteDescription,
          hid: "og:description",
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
          hid: "twitter:card",
        },
        {
          property: "twitter:title",
          content: siteTitle,
          hid: "twitter:title",
        },
        {
          property: "twitter:description",
          content: siteDescription,
          hid: "twitter:description",
        },
        {
          property: "twitter:image",
          content: this.urlFor(this.siteConfig.ogImage.asset)
            .width(1200)
            .height(630)
            .url(),
          hid: "twitter:image",
        },
      ],
    };
  },

  computed: {
    siteConfig() {
      return this.$store.state.siteConfig;
    },
    isMobile() {
      return this.$store.state.isMobile;
    },
    texSuffix() {
      return this.isMobile ? "" : "-lrg";
    },
    imgSizes() {
      return this.$store.state.imgSizes;
    },
    cssVars() {
      return {
        intro: {
          "--primary-color": this.intro.introTheme.primaryColor.value,
          "--secondary-color": this.intro.introTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.intro.introTheme.texture}${this.texSuffix})`,
          "--section-height": "100vh",
        },
        about: {
          "--primary-color": this.about.aboutTheme.primaryColor.value,
          "--secondary-color": this.about.aboutTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.about.aboutTheme.texture}${this.texSuffix})`,
        },
        work: {
          "--primary-color": this.work.workTheme.primaryColor.value,
          "--secondary-color": this.work.workTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.work.workTheme.texture}${this.texSuffix})`,
          "--section-height": "90vh",
        },
        whatWeDo: {
          "--primary-color": this.whatWeDo.whatWeDoTheme.primaryColor.value,
          "--secondary-color": this.whatWeDo.whatWeDoTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.whatWeDo.whatWeDoTheme.texture}${this.texSuffix})`,
          "--section-height": "90vh",
        },
        partnerships: {
          "--primary-color":
            this.partnerships.partnershipsTheme.primaryColor.value,
          "--secondary-color":
            this.partnerships.partnershipsTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.partnerships.partnershipsTheme.texture}${this.texSuffix})`,
          "--section-height": "90vh",
        },
        team: {
          "--primary-color": this.meetTheTeam.teamTheme.primaryColor.value,
          "--secondary-color": this.meetTheTeam.teamTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.meetTheTeam.teamTheme.texture}${this.texSuffix})`,
          "--section-height": "90vh",
        },
      };
    },
  },
  mounted() {
    console.log(this.isMobile);
    this.$store.commit("setFullColor", false);
    document.documentElement.style.setProperty(
      "--primary-color",
      "var(--default-primary)"
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      "var(--default-secondary)"
    );
    this.$nextTick(() => this.init());
  },
  methods: {
    urlFor(source) {
      return urlBuilder.image(source);
    },
    init() {
      this.splitText();
      setTimeout(() => {
        this.initScrollAni();
      }, 100);
      if (!this.isMobile) {
        const imgLoad = imagesLoaded(
          this.$refs["about-images-container"],
          { background: true },
          () => {
            this.$nextTick(() => {
              this.initAboutScroller();
            });
          }
        );
        imgLoad.on("progress", function (instance, image) {
          const result = image.isLoaded ? "loaded" : "broken";
          console.log("image is " + result + " for " + image.img.src);
        });
      }
    },
    initAboutScroller() {
      const images = document.getElementById("about-images-container");
      const stats = document.getElementById("about-stats-container");
      const texRight = document.getElementById("stats-tex-right");
      const tlAbout = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-stat-scroller",
          start: "top top",
          scrub: 0.1,
          pin: true,
          end: `${innerHeight}px`,
        },
      });
      tlAbout.to(
        images,
        {
          x: "-=100%",
          ease: "sine.inOut",
        },
        0
      );
      tlAbout.to(
        stats,
        {
          x: "-=100%",
          ease: "sine.inOut",
        },
        0
      );
      tlAbout.to(
        texRight,
        {
          x: "+=100%",
          ease: "sine.inOut",
        },
        0
      );
      const why = document.getElementById("why-circa");
      const whyLabel = document.getElementById("why-label");
      const whyTex = document.getElementById("why-circa-tex");
      gsap.fromTo(
        whyTex,
        { x: "-=100%" },
        {
          x: 0,
          scrollTrigger: {
            trigger: why,
            scrub: 0.2,
            start: "top bottom",
            end: "top 150px",
            ease: "power2.out",
          },
        },
        0
      );
      ScrollTrigger.create({
        trigger: why,
        start: "top top",
        end: "bottom center",
        pin: [whyTex],
      });
      ScrollTrigger.create({
        trigger: why,
        start: "top top",
        end: "bottom center",
        pin: [whyLabel],
      });
    },
    splitText() {
      Splitting({
        target: "[data-splitting]",
        key: null,
        by: "lines",
      });
    },
    onLoad() {
      this.ready = true;
      setTimeout(() => {
        this.showUi = true;
      }, 300);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/pages/home";
</style>
