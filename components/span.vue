<template>
  <span class="copy-line">
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
