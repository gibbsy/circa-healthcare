<template>
  <div>
    <h1>{{ headline }}</h1>
    <h4>{{ introLabel }}</h4>
    <block-content :blocks="introBody"></block-content>
    <div class="values-container">
      <div class="values-content">
        <div class="values-label">
          <h3>{{ valuesLabel }}</h3>
        </div>
        <div class="values-list">
          <div v-for="value in valuesList" :key="value.title" class="value">
            <h3>{{ value.title }}</h3>
            <block-content :blocks="value.text"></block-content>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { joinUsQuery as query } from "../data/queries";
export default {
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData,
    };
  },
};
</script>
