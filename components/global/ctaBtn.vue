<template>
  <div class="cta-btn-wrapper">
    <nuxt-link
      v-if="!external"
      class="cta-primary"
      :to="slug"
      data-scroll-reveal
      ><span class="arrow">
        <cta-arrow />
      </span>
      <slot></slot
    ></nuxt-link>
    <a v-else-if="external" class="cta-primary" :href="url" data-scroll-reveal
      ><span class="arrow"> <cta-arrow /> </span><slot></slot
    ></a>
  </div>
</template>
<script>
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";
export default {
  components: { CtaArrow },
  props: {
    title: {
      type: String,
      default: "Cta title",
    },
    external: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>
