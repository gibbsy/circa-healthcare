<template>
  <div>
    <h1>{{ headline }}</h1>
    <block-content :blocks="introSubhead"></block-content>
    <block-content :blocks="introBody"></block-content>
    {{ clientList }}
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { clientsQuery as query } from "../data/queries";
export default {
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
};
</script>
