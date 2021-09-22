<template>
  <div ref="scroll-legal" class="page-wrapper ancillary-page legals">
    <corner-logo :show="showUi" :full-color="true"></corner-logo>

    <section
      id="legals-wrapper"
      class="generic__container legals__container"
      data-scroll
    >
      <div
        class="generic-texture-bg pull-right"
        data-scroll
        data-scroll-sticky="true"
        data-scroll-target="#sticky-logo-target"
      >
        <div class="inner-texture"></div>
      </div>

      <div class="generic__content">
        <transition name="fade" appear mode="out-in">
          <block-content
            :class-name="'legals__text text-block--full-width'"
            :blocks="pageData.text"
          ></block-content>
        </transition>
      </div>
    </section>

    <app-footer></app-footer>
  </div>
</template>
<script>
import mobile from "is-mobile";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@/sanityClient";
import AppFooter from "~/components/AppFooter.vue";
const urlBuilder = imageUrlBuilder(sanityClient);
console.log(mobile());
export default {
  components: {
    AppFooter,
  },
  async asyncData({ route, params }) {
    const query = `*[_type == "legalsPage" && slug.current == "${params.slug}"]{_id, slug, text, title}`;
    const pageData = await sanityClient.fetch(query);
    console.log(pageData[0]);
    return { pageData: pageData[0] };
  },
  data() {
    return {
      scroll: {
        update: () => {
          console.log("scroll not initialized");
        },
        destroy: () => {
          console.log("scroll not initialized destroy");
        },
      },
    };
  },
  mounted() {
    this.init();
    document.body.style.setProperty("--bg-root", "#ffffff");
  },
  beforeDestroy() {
    console.log("DESTROY SLUG");
    window.removeEventListener("resize", this.handleResize);
    this.scroll.destroy();
    this.scroll = null;
  },
  methods: {
    init() {
      this.initScroll();
    },
    urlFor(source) {
      return urlBuilder.image(source);
    },
    initScroll() {
      const el = this.$refs["scroll-legal"];
      this.scroll = new this.LocomotiveScroll({
        el,
        smooth: true,
        getDirection: true,
      });
      setTimeout(() => {
        this.updateScroll();
      }, 500);
      this.initScrollEvents();
    },
    initScrollEvents() {
      window.addEventListener("resize", this.handleResize);
    },
    updateScroll() {
      console.log("update scroll");
      this.scroll.update();
      // ScrollTrigger.refresh();
    },
    scrollTo(target, options) {
      this.scroll.scrollTo(target, options);
    },
    handleResize() {
      console.log("Resize");
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.updateScroll();
      }, 250);
    },
  },
};
</script>
