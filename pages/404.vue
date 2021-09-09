<template>
  <div ref="scroll-legal" class="page-wrapper ancillary-page error-404">
    <div id="sticky-logo-target"></div>
    <transition name="fade" appear mode="out-in">
      <div
        ref="logo-peel"
        class="circa-logo logo-corner-left"
        aria-label="circa Logo"
        data-scroll
        data-scroll-sticky="true"
        data-scroll-target="#sticky-logo-target"
      >
        <nuxt-link to="/">
          <logo />
        </nuxt-link>
      </div>
    </transition>
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

      <transition name="fade" appear mode="out-in">
        <div class="generic__content error-message">
          <h2>Oops, we can't find that page.</h2>
          <nuxt-link to="/" class="cta-link--arrow"
            >Back to the home page</nuxt-link
          >
        </div>
      </transition>
    </section>

    <app-footer></app-footer>
  </div>
</template>
<script>
import Logo from "~/assets/circa_logo_nofill.svg?inline";
export default {
  components: {
    Logo,
  },
};
</script>
