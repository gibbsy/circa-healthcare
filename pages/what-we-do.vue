<template>
  <div>
    <h1>{{ heroHeadline }}</h1>
    <h2>{{ introSubhead }}</h2>
    <block-content :blocks="introBody"></block-content>
    {{ clientList }}
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { whatWeDoQuery as query } from "../data/queries";
export default {
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
};
</script>
