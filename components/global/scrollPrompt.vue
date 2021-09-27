<template>
  <a
    href
    class="scroll-prompt"
    :class="{ mono }"
    data-scroll-reveal
    data-reveal-start="top bottom"
    data-reveal-end="top bottom-=200px"
    data-scroll-repeat="true"
    @click.prevent="scrollTo"
  >
    <span>
      <scroll-prompt-arrow></scroll-prompt-arrow>
    </span>
  </a>
</template>
<script>
import ScrollPromptArrow from "~/assets/scroll-prompt-arrow.svg?inline";

export default {
  components: {
    ScrollPromptArrow,
  },
  props: {
    mono: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo() {
      gsap.to(window, {
        duration: 1.2,
        ease: "power2.inOut",
        scrollTo: window.innerHeight,
        autoKill: true,
      });
    },
  },
};
</script>
