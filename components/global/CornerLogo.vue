<template>
  <div
    :class="['circa-logo', 'logo-corner-left', { 'full-color': fullColor }]"
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
  },
  mounted() {
    const logo = this.$refs["logo-svg"];
    this.tl = gsap.timeline({
      delay: 1.5,
    });
    this.tl.fromTo(
      ".logo-corner-left",
      { x: "-100%" },
      { x: 0, duration: 1.5, ease: "power4.out" },
      0
    );
    this.tl.to(logo, { opacity: 1, duration: 0.8 }, 0.75);
  },
};
</script>
