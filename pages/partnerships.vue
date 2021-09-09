<template>
  <div>
    <h1>{{ headline }}</h1>
    <h4>{{ introLabel }}</h4>
    <block-content :blocks="introBody"></block-content>
    {{ partners }}
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { partnershipsQuery as query } from "../data/queries";
export default {
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
};
</script>
