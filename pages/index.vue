<template>
  <div id="page-wrapper" ref="page-wrapper" class="home page-wrapper">
    <section id="hero" class="hero-container">
      <div
        ref="heroBg"
        class="hero-background"
        data-scroll-parallax
        data-scroll-speed="0.2"
        data-scroll-start="top top"
      >
        <HeroVideo
          player-id="textures"
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
    </section>

    <transition appear name="fade">
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
    </transition>
    <section id="intro" class="intro-container white-bg" :style="cssVars.intro">
      <div class="texture-pull-left"></div>
      <div
        class="texture-pull-right"
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      ></div>
      <div class="intro-content">
        <article class="intro-text" data-scroll-reveal>
          <block-content :blocks="intro.intro"></block-content>
        </article>
      </div>
    </section>
    <section
      id="about"
      ref="about"
      class="about-container full-colour"
      :style="cssVars.about"
      data-scroll-reveal
    >
      <div id="about-stat-scroller" class="stat-scroller-container">
        <div class="stat-scroller-inner">
          <div
            class="about-headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ about.aboutHeadline }}</h2>
          </div>
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
              <div class="stat__text">
                <h3>{{ stat.title }}</h3>
                <p>{{ stat.text }}</p>
              </div>
            </div>
          </div>
          <div id="stats-tex-right" class="texture-pull-right"></div>
        </div>
      </div>
      <div id="why-circa" class="why-circa-container">
        <div id="why-circa-tex" class="texture-pull-left"></div>

        <div
          class="why-circa-headline-container title-reveal"
          data-splitting
          data-scroll-reveal
        >
          <h2 class="copy-line">{{ whyCirca.whyLabel }}</h2>
        </div>
        <article id="why-circa-content" class="why-circa-content">
          <div
            v-for="(section, i) in whyCirca.whySections"
            :key="i"
            class="why-section"
          >
            <h3>{{ section.title }}</h3>
            <block-content :blocks="section.text"></block-content>
          </div>
        </article>
      </div>
    </section>
    <section id="work" class="work-container white-bg" :style="cssVars.work">
      <div class="texture-pull-left"></div>
      <div
        class="texture-pull-right"
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      ></div>
      <div class="section-hero-image__wrapper work" data-scroll-reveal>
        <figure
          class="section-hero-image__inner work"
          data-scroll-parallax
          data-scroll-direction="horizontal"
          data-scroll-speed="-0.1"
          :alt="work.workImage.title"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(work.workImage.asset)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 3)
                    )
                    .height(Math.floor(imgRes.height / 2))
                    .auto('format')
                    .quality(70)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="work-content">
        <div class="section-label-wrapper" data-scroll-reveal>
          <h3 class="section-caption">{{ work.workLabel }}</h3>
        </div>
        <div class="intro-text-lockup">
          <div
            class="work-headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ work.workHeadline }}</h2>
          </div>
          <article class="intro-text" data-scroll-reveal>
            <block-content :blocks="work.workBody"></block-content>
          </article>
          <button class="btn-primary"></button>
        </div>
      </div>
    </section>
    <section
      id="what-we-do"
      class="what-we-do-container white-bg"
      :style="cssVars.whatWeDo"
    >
      <div class="texture-pull-left"></div>
      <div
        class="texture-pull-right"
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      ></div>
      <div class="section-hero-image__wrapper what-we-do" data-scroll-reveal>
        <figure
          class="section-hero-image__inner what-we-do"
          data-scroll-parallax
          data-scroll-direction="horizontal"
          data-scroll-speed="-0.1"
          :alt="whatWeDo.whatWeDoImage.title"
          :style="{
            backgroundImage:
              imgRes.width > 1
                ? `url('${urlFor(whatWeDo.whatWeDoImage.asset)
                    .width(
                      isMobile && imgRes.width < 1000
                        ? imgRes.width
                        : Math.floor(imgRes.width / 3)
                    )
                    .height(Math.floor(imgRes.height / 2))
                    .auto('format')
                    .quality(70)
                    .url()}')`
                : 'none',
          }"
        ></figure>
      </div>
      <div class="what-we-do-content">
        <div class="section-label-wrapper" data-scroll-reveal>
          <h3 class="section-caption">{{ whatWeDo.whatWeDoLabel }}</h3>
        </div>
        <div class="intro-text-lockup">
          <div
            class="what-we-do-headline-container title-reveal"
            data-splitting
            data-scroll-reveal
          >
            <h2 class="copy-line">{{ whatWeDo.whatWeDoHeadline }}</h2>
          </div>
          <article class="intro-text" data-scroll-reveal>
            <block-content :blocks="whatWeDo.whatWeDoBody"></block-content>
          </article>
          <button class="btn-primary"></button>
        </div>
      </div>
    </section>
    <section
      id="partnerships"
      class="partnerships-container full-colour"
      :style="cssVars.partnerships"
    >
      <div class="texture-pull-left"></div>
      <div
        class="texture-pull-right"
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      ></div>

      <div class="partnerships-content">
        <div class="section-label-wrapper" data-scroll-reveal>
          <h3 class="section-caption">{{ partnerships.partnershipsLabel }}</h3>
        </div>
        <div class="intro-text-lockup">
          <article class="intro-text" data-scroll-reveal>
            <h3>{{ partnerships.partnershipsText }}</h3>
          </article>
          <button class="btn-primary"></button>
        </div>
      </div>
    </section>
    <section id="team" class="team-container full-colour" :style="cssVars.team">
      <div class="texture-pull-left"></div>
      <div
        class="texture-pull-right"
        data-scroll-parallax
        data-scroll-speed="-0.2"
        data-scroll-direction="horizontal"
      ></div>

      <div class="team-content">
        <div class="section-label-wrapper" data-scroll-reveal>
          <h3 class="section-caption">{{ meetTheTeam.teamLabel }}</h3>
        </div>
        <div class="intro-text-lockup">
          <article class="intro-text" data-scroll-reveal>
            <h3>{{ meetTheTeam.teamText }}</h3>
          </article>
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
import Logo from "~/assets/circa_logo_nofill.svg?inline";

const urlBuilder = imageUrlBuilder(sanityClient);

if (typeof window === "undefined") {
  global.window = { innerWidth: 0, innerHeight: 0, devicePixelRatio: 0 };
}

export default {
  components: {
    Logo,
  },
  mixins: [scrollAnimations],
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
    cssVars() {
      return {
        intro: {
          "--primary-color": this.intro.introTheme.primaryColor.value,
          "--secondary-color": this.intro.introTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.intro.introTheme.texture});`,
        },
        about: {
          "--primary-color": this.about.aboutTheme.primaryColor.value,
          "--secondary-color": this.about.aboutTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.about.aboutTheme.texture});`,
        },
        work: {
          "--primary-color": this.work.workTheme.primaryColor.value,
          "--secondary-color": this.work.workTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.work.workTheme.texture});`,
        },
        whatWeDo: {
          "--primary-color": this.whatWeDo.whatWeDoTheme.primaryColor.value,
          "--secondary-color": this.whatWeDo.whatWeDoTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.whatWeDo.whatWeDoTheme.texture});`,
        },
        partnerships: {
          "--primary-color":
            this.partnerships.partnershipsTheme.primaryColor.value,
          "--secondary-color":
            this.partnerships.partnershipsTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.partnerships.partnershipsTheme.texture});`,
        },
        team: {
          "--primary-color": this.meetTheTeam.teamTheme.primaryColor.value,
          "--secondary-color": this.meetTheTeam.teamTheme.secondaryColor.value,
          "--bg-texture": `var(--tex-${this.meetTheTeam.teamTheme.texture});`,
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
    gsap.registerPlugin(ScrollTrigger);
    this.setImgRes();
    this.$nextTick(() => this.init());
  },
  beforeDestroy() {
    console.log("destroy scroll");
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    init() {
      this.$nextTick(() => this.initScrollAni());
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
          x: "+=20%",
          ease: "sine.inOut",
        },
        0
      );
      const tlWhy = gsap.timeline({
        scrollTrigger: {
          trigger: why,
          start: "top top",
          scrub: true,
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

      /* gsap.set(whyTex, {
        scrollTrigger: {
          trigger: whyTex,
          start: "top top",
          toggleClass: "is-inview",
        },
      }); */
      /* gsap.fromTo(
        "#why-circa-tex",
        { x: "-=40%" },
        {
          scrollTrigger: {
            trigger: why,
            start: "top top",
          },
          x: 0,
          ease: "power4.out",
          duration: 2,
          scrub: 0.1,
        }
      ); */
    },
    urlFor(source) {
      return urlBuilder.image(source);
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
    handleResize() {
      console.log("Resize");
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updateScroll();
      }, 250);
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
      this.splitText();
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
