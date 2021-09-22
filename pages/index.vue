<template>
  <div id="page-wrapper" ref="page-wrapper" class="home page-wrapper">
    <section id="hero" class="hero-container section-container">
      <div
        ref="heroBg"
        class="hero-background"
        data-scroll-parallax
        data-scroll-speed="0.2"
        data-scroll-start="top top"
      >
        <HeroVideo
          v-if="typeof hero.heroVideo === 'string'"
          :vimeo-id="hero.heroVideo"
          :ready-fn="onLoad"
        ></HeroVideo>
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

    <!--    <transition appear name="fade">
      <div
        v-show="showUi"
        ref="logo-peel"
        class="circa-logo logo-corner-left"
        aria-label="circa Logo"
      >
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
    </transition> -->
    <corner-logo :show="showUi" :delay="1.5"></corner-logo>
    <section
      id="intro"
      class="intro-container section-container white-bg v-centered"
      :style="cssVars.intro"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', intro.introTheme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div
        class="texture-pull-right reveal-slide-in"
        data-scroll-reveal
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      >
        <div :class="['inner-texture', intro.introTheme.texture]"></div>
      </div>
      <div
        class="intro-content content-block v-centered reveal"
        data-scroll-reveal
      >
        <article class="intro-text-lockup col-12 col-md-8 col-xl-7">
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
      class="about-container section-container full-color"
      :style="cssVars.about"
      data-scroll-reveal
    >
      <div
        :class="['inner-texture', about.aboutTheme.texture]"
        data-scroll-parallax
        data-scroll-speed="2"
      ></div>
      <div id="about-stat-scroller" class="stat-scroller-container">
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
              <div
                v-for="img in about.aboutImages"
                :key="img.title"
                class="about-img"
              >
                <figure
                  class="inner-image"
                  :style="{
                    backgroundImage: `url('${urlFor(img.asset)
                      .width(500)
                      .height(500)
                      .auto('format')
                      .quality(70)
                      .url()}')`,
                  }"
                ></figure>
              </div>
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
            <div :class="['inner-texture', about.aboutTheme.texture]"></div>
          </div>
        </div>
      </div>
      <div id="why-circa" class="why-circa-container">
        <div id="why-circa-tex" class="texture-pull-left">
          <div :class="['inner-texture', about.aboutTheme.texture]"></div>
        </div>

        <div
          class="headline-container title-reveal"
          data-splitting
          data-scroll-reveal
        >
          <h2 class="copy-line">{{ whyCirca.whyLabel }}</h2>
        </div>
        <article
          id="why-circa-content"
          class="why-circa-content col-12 offset-lg-4 col-lg-6"
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
      class="work-container section-container white-bg"
      :style="cssVars.work"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', work.workTheme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', work.workTheme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="section-hero-image-wrapper work" data-scroll-reveal>
        <figure
          class="section-hero-image-inner work"
          :alt="work.workImage.title"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(work.workImage)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 2)
                    )
                    .auto('format')
                    .quality(80)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="work-content">
        <div class="intro-text-lockup col-12 col-md-8 col-xl-7">
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
      class="what-we-do-container section-container white-bg"
      :style="cssVars.whatWeDo"
    >
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', whatWeDo.whatWeDoTheme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', whatWeDo.whatWeDoTheme.texture]"
          data-scroll-parallax
          data-scroll-speed="0.5"
        ></div>
      </div>
      <div class="section-hero-image-wrapper what-we-do" data-scroll-reveal>
        <figure
          class="section-hero-image-inner what-we-do"
          :alt="whatWeDo.whatWeDoImage.title"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(whatWeDo.whatWeDoImage)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 2)
                    )
                    .auto('format')
                    .quality(80)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="what-we-do-content">
        <div class="intro-text-lockup col-12 col-md-8 col-xl-7">
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
        </div>
        <div class="icon-list-container row">
          <div
            v-for="(item, i) in whatWeDo.whatWeDoList"
            :key="i"
            class="icon-lockup services flex-col-12 flex-col-md-4"
            data-scroll-reveal
          >
            <figure
              class="icon-lockup-icon"
              :style="{ backgroundImage: `url(${urlFor(item.icon)})` }"
              data-scroll
            ></figure>
            <h3 class="icon-lockup-title">{{ item.title }}</h3>
            <block-content :blocks="item.text"></block-content>
          </div>
        </div>
        <div class="cta-centred-container">
          <cta-btn class="cta-primary" :slug="whatWeDo.whatWeDoCta.slug">{{
            whatWeDo.whatWeDoCta.title
          }}</cta-btn>
        </div>
      </div>
    </section>
    <section
      id="partnerships"
      class="partnerships-container section-container full-color"
      :style="cssVars.partnerships"
    >
      <div
        :class="['inner-texture', partnerships.partnershipsTheme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.2"
      ></div>
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', partnerships.partnershipsTheme.texture]"
        ></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div
          :class="['inner-texture', partnerships.partnershipsTheme.texture]"
        ></div>
      </div>

      <div class="partnerships-content">
        <div class="intro-text-lockup col-12 col-md-8 col-xl-7">
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
      class="team-container section-container full-color"
      :style="cssVars.team"
    >
      <div
        :class="['inner-texture', meetTheTeam.teamTheme.texture]"
        data-scroll-parallax
        data-scroll-speed="0.2"
      ></div>
      <div class="section-hero-image-wrapper" data-scroll-reveal>
        <figure
          data-scroll-parallax
          data-scroll-speed="0.2"
          class="section-hero-image-inner"
          :alt="meetTheTeam.teamImage.title"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(meetTheTeam.teamImage)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 2)
                    )
                    .auto('format')
                    .saturation(-100)
                    .quality(80)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="texture-pull-left reveal-slide-in" data-scroll-reveal>
        <div :class="['inner-texture', meetTheTeam.teamTheme.texture]"></div>
      </div>
      <div class="texture-pull-right reveal-slide-in" data-scroll-reveal>
        <div :class="['inner-texture', meetTheTeam.teamTheme.texture]"></div>
      </div>

      <div class="team-content">
        <div class="intro-text-lockup col-12 col-lg-6 offset-lg-6">
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
import mobile from "is-mobile";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanityClient";
import { homeQuery as query } from "../data/queries";
import scrollAnimations from "~/mixins/scrollAnimations";
import copyline from "~/components/span.vue";

const urlBuilder = imageUrlBuilder(sanityClient);

if (typeof window === "undefined") {
  global.window = { innerWidth: 0, innerHeight: 0, devicePixelRatio: 0 };
}

export default {
  mixins: [scrollAnimations],
  transition: {
    name: "fade-pause",
    mode: "out-in",
  },
  async asyncData() {
    const homeData = await sanityClient.fetch(query);
    // console.log(homeData);
    return {
      ...homeData.home,
      config: homeData.config[0],
    };
  },
  data() {
    return {
      resizeTimeout: 0,
      showUi: false,
      showPrompt: false,
      ready: false,
      imgRes: { width: 1, height: 1, dpr: 1 },
      isMobile: "",
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  head() {
    const { title, description } = this.config;
    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          property: "og:locale",
          content: "en_GB",
          vmid: "og:locale",
        },
        {
          property: "og:type",
          content: "website",
          vmid: "og:type",
        },
        {
          property: "og:url",
          content: "https://www.circa-healthcare.co.uk",
          vmid: "og:url",
        },
        {
          property: "og:site_name",
          content: "Circa Healthcare",
          vmid: "og:site_name",
        },
        {
          property: "og:image",
          content:
            "https://www.circa-healthcare.co.uk/circa_thumbnail_large.jpg",
          vmid: "og:image",
        },
        {
          property: "og:image:width",
          content: "1200",
          vmid: "og:image_width",
        },
        {
          property: "og:image:height",
          content: "630",
          vmid: "og:image_width",
        },
        {
          property: "og:title",
          content: title,
          vmid: "og:title",
        },
        {
          property: "og:description",
          content: description,
          vmid: "og:description",
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
          vmid: "twitter:card",
        },
        {
          property: "twitter:title",
          content: title,
          vmid: "twitter:title",
        },
        {
          property: "twitter:description",
          content: description,
          vmid: "twitter:description",
        },
        {
          property: "twitter:image",
          content:
            "https://www.circa-healthcare.co.uk/circa_thumbnail_large.jpg",
          vmid: "twitter:image",
        },
      ],
    };
  },

  computed: {
    texSuffix() {
      return this.isMobile ? "" : "-lrg";
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
          "--section-height": "100vh",
        },
        whatWeDo: {
          "--primary-color": this.whatWeDo.whatWeDoTheme.primaryColor.value,
          "--secondary-color": this.whatWeDo.whatWeDoTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.whatWeDo.whatWeDoTheme.texture}${this.texSuffix})`,
        },
        partnerships: {
          "--primary-color":
            this.partnerships.partnershipsTheme.primaryColor.value,
          "--secondary-color":
            this.partnerships.partnershipsTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.partnerships.partnershipsTheme.texture}${this.texSuffix})`,
          "--section-height": "100vh",
        },
        team: {
          "--primary-color": this.meetTheTeam.teamTheme.primaryColor.value,
          "--secondary-color": this.meetTheTeam.teamTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.meetTheTeam.teamTheme.texture}${this.texSuffix})`,
          "--section-height": "100vh",
        },
      };
    },
  },

  mounted() {
    if (mobile({ tablet: true, featureDetect: true })) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.setImgRes();
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
    },
    initAboutScroller() {
      const images = document.getElementById("about-images-container");
      const stats = document.getElementById("about-stats-container");
      const texRight = document.getElementById("stats-tex-right");
      const why = document.getElementById("why-circa");
      const whyContent = document.getElementById("why-circa-content");
      const whyTex = document.getElementById("why-circa-tex");

      const tlAbout = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-stat-scroller",
          // trigger: "#about",
          start: "top top",
          scrub: 0.2,
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
          x: "+=20%",
          ease: "sine.inOut",
        },
        0
      );
      const tlWhy = gsap.timeline({
        scrollTrigger: {
          trigger: why,
          start: "top top",
          scrub: 0.2,
          pin: true,
          end: `${innerHeight * 1.5}px`,
        },
      });
      tlWhy.fromTo(
        whyTex,
        { x: "-=40%" },
        {
          x: 0,
          duration: 1,
        },
        0
      );
      tlWhy.to(
        whyContent,
        {
          y: "-=100%",
          ease: "none",
          duration: 2,
        },
        0
      );
    },

    setImgRes() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      const res = {};
      if (width > 1440) {
        res.width = 1920;
        res.height = 1080;
      } else if (width > 1024) {
        res.width = 1440;
        res.height = 900;
      } else if (width >= 768) {
        res.width = 800;
      }
      res.height = Math.round(height * 0.8);
      if (this.isMobile) {
        // alert(width + " " + height);
        res.width = width;
        res.height = height;
      }
      this.imgRes = { ...res, dpr };
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
