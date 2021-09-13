<template>
  <div
    class="scroll-prompt"
    :class="{ mono }"
    data-scroll-reveal
    data-reveal-start="top bottom"
    data-reveal-end="top bottom-=200px"
    data-scroll-repeat="true"
  >
    <span>
      <scroll-prompt-arrow></scroll-prompt-arrow>
    </span>
  </div>
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
};
</script>
