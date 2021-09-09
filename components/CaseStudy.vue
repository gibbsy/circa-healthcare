<template>
  <div class="case-study__wrapper" data-scroll data-scroll-offset="35%">
    <div
      v-if="loaded"
      class="section-hero-image__wrapper case-study"
      data-scroll
      data-scroll-offset="35%"
    >
      <figure
        class="section-hero-image__inner case-study"
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="-1"
        :alt="content.hero.title"
        :style="{
          backgroundImage:
            imgRes.width > 1
              ? `url('${urlFor(content.hero.asset)
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
    <article class="case-study__content">
      <div class="case__title-section">
        <div
          class="section-caption-wrapper"
          data-scroll
          data-scroll-offset="30%"
        >
          <h3 class="section-caption">Case Study</h3>
        </div>
        <div
          class="case__title title-reveal"
          data-scroll
          data-splitting
          data-scroll-offset="30%"
        >
          <block-content
            :blocks="content.title"
            :serializers="serializers"
          ></block-content>
        </div>
        <div class="case__meta">
          <div class="case__client" data-scroll>
            <h3>Client</h3>
            <h3>{{ content.client }}</h3>
          </div>
          <div class="case__product" data-scroll>
            <h3>Product</h3>
            <h3>{{ content.product }}</h3>
          </div>
        </div>
      </div>
      <div class="case__body">
        <div
          class="case__problem body-copy"
          data-scroll
          data-scroll-offset="20%"
        >
          <h3>What was the problem?</h3>
          <block-content :blocks="content.problem"></block-content>
        </div>
        <div
          class="case__solution body-copy"
          data-scroll
          data-scroll-offset="20%"
        >
          <h3>How did we solve it?</h3>
          <block-content :blocks="content.solution"></block-content>
        </div>
      </div>
    </article>
    <div
      ref="carousel-container"
      class="case__carousel-container"
      data-scroll
      data-scroll-offset="20%"
    >
      <div class="section-caption-wrapper" data-scroll data-scroll-offset="30%">
        <h3 class="section-caption full-width">View the work</h3>
      </div>

      <div class="case__carousel-outer-wrapper">
        <div
          :id="carouselId"
          ref="carousel-wrapper"
          class="case__carousel-wrapper"
        >
          <figure
            v-for="img in content.projectImages"
            :key="img.title"
            :class="['case__img', img.orientation]"
          >
            <img
              :src="
                imgRes.width > 1
                  ? urlFor(img.asset)
                      .height(
                        img.orientation === 'landscape'
                          ? Math.floor(imgRes.height / 1.5)
                          : imgRes.height
                      )
                      .auto('format')
                      .quality(70)
                      .url()
                  : ''
              "
              alt=""
            />
          </figure>
        </div>
        <div v-show="carousel.active" class="carousel-ctrls">
          <button
            id="carousel-ctrl-left"
            aria-label="Left"
            class="carousel-ctrl --left"
            @click.prevent="carouselRight"
          ></button>
          <button
            id="carousel-ctrl-right"
            aria-label="Right"
            class="carousel-ctrl --right"
            @click.prevent="carouselLeft"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mobile from "is-mobile";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanityClient";
import copyline from "~/components/span.vue";

const urlBuilder = imageUrlBuilder(sanityClient);
export default {
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    imgRes: {
      type: Object,
      default: () => {},
    },
    scroll: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loaded: false,
      isMobile: "",
      carousel: {
        position: 0,
        animating: false,
        easeFn: "power2.inOut",
        active: false,
      },
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  computed: {
    carouselId() {
      return `carousel-${this.convertToSlug(
        this.content.client + "-" + this.content.product
      )}`;
    },
  },
  mounted() {
    this.isMobile = mobile({ tablet: true, featureDetect: true });
    const imgLoad = imagesLoaded("#" + this.carouselId, (instance) => {
      this.loaded = true;
      console.log(instance);
      this.$nextTick(() => {
        this.initCarousel();
      });
    });
    imgLoad.on("progress", function (instance, image) {
      const result = image.isLoaded ? "loaded" : "broken";
      console.log("image is " + result + " for " + image.img.src);
    });
  },
  methods: {
    initCarousel() {
      const container = this.$refs["carousel-container"];
      const el = this.$refs["carousel-wrapper"];
      const elWidth = el.scrollWidth;
      const margin = Math.round(window.innerWidth * 0.2);
      const scrollDist = elWidth - window.innerWidth + margin;
      const increment = Math.floor(window.innerWidth / 3);
      console.log(elWidth, scrollDist, increment);
      Object.assign(this.carousel, {
        container,
        el,
        elWidth,
        scrollDist,
        increment,
      });
      if (scrollDist > margin / 2) {
        this.carousel.active = true;
      }
      this.updateScroll();
    },
    urlFor(source) {
      return urlBuilder.image(source);
    },
    updateScroll() {
      console.log("update scroll");
      this.scroll.update();
      ScrollTrigger.refresh();
    },
    convertToSlug(txt) {
      return txt
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
    carouselLeft() {
      const { el, position, animating, scrollDist, increment, easeFn } =
        this.carousel;
      if (animating) {
        return;
      }
      console.log(position, increment);
      if (position > -scrollDist && position <= scrollDist - 1) {
        this.carousel.animating = true;
        gsap.to(el, {
          x: `-=${increment}`,
          ease: easeFn,
          onComplete: () => {
            this.carousel.animating = false;
          },
        });
        this.carousel.position -= increment;
      } else if (position <= -scrollDist) {
        this.carousel.animating = true;
        gsap.to(el, {
          x: 0,
          duration: 1.2,
          ease: easeFn,
          onComplete: () => {
            this.carousel.animating = false;
          },
        });
        this.carousel.position = 0;
      }
    },
    carouselRight() {
      const { el, position, animating, scrollDist, increment, easeFn } =
        this.carousel;
      if (animating) {
        return;
      }
      console.log(position, increment);
      if (position <= -1) {
        this.carousel.animating = true;
        gsap.to(el, {
          x: `+=${increment}`,
          ease: easeFn,
          onComplete: () => {
            this.carousel.animating = false;
          },
        });
        this.carousel.position += increment;
      } else if (position >= 0) {
        this.carousel.animating = true;
        gsap.to(el, {
          x: -scrollDist,
          duration: 1.2,
          ease: easeFn,
          onComplete: () => {
            this.carousel.animating = false;
          },
        });
        this.carousel.position = -scrollDist;
      }
    },
  },
};
</script>
