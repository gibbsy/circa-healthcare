<template>
  <div
    ref="logo-container"
    :class="[
      'circa-logo',
      'logo-corner-left',
      { 'full-color': fullColor, 'white-bg': whiteBg },
    ]"
    aria-label="circa Logo"
  >
    <div v-if="fullColor" :class="['inner-texture']"></div>
    <nuxt-link to="/">
      <logo ref="logo-svg" />
    </nuxt-link>
  </div>
</template>
<script>
import Logo from "~/assets/circa_logo_nofill.svg?inline";

export default {
  components: { Logo },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    fullColor: {
      type: Boolean,
      default: false,
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    const container = this.$refs["logo-container"];
    const logo = this.$refs["logo-svg"];
    this.tl = gsap.timeline({
      delay: this.delay,
    });
    if (window.innerHeight > 767) {
      this.tl.fromTo(
        container,
        { x: "-100%" },
        { x: 0, duration: 1.5, ease: "power4.out" },
        0
      );
      this.tl.to(logo, { opacity: 1, duration: 0.8 }, 0.75);
    } else {
      this.tl.to(logo, { opacity: 1, duration: 0.8 }, 0);
    }
  },
};
</script>
