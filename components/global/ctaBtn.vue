<template>
  <nuxt-link class="cta-primary" :to="slug" data-scroll-reveal
    ><span class="arrow">
      <cta-arrow />
    </span>
    <slot></slot
  ></nuxt-link>
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
    slug: {
      type: String,
      default: "/",
    },
  },
};
</script>
