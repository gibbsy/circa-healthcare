<template>
  <div class="cookie-panel">
    <p>
      We use cookies to analyze traffic and improve your experience. Learn more
      in our
      <a @click.prevent="viewPolicy">Cookie and Privacy Policy.</a>
    </p>
    <a class="cta-link" @click.prevent="acceptFn">Continue</a>
  </div>
</template>
<script>
export default {
  props: {
    acceptFn: {
      type: Function,
      default: () => console.log("Expected click function"),
    },
    navigateFn: {
      type: Function,
      default: () => console.log("Expected click function"),
    },
  },
  methods: {
    viewPolicy() {
      this.navigateFn();
      this.$router.push("/cookie-and-privacy-policy");
    },
  },
};
</script>
