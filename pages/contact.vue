<template>
  <div>
    <h1>{{ headline }}</h1>
    <h4>{{ pageLabel }}</h4>
    <block-content :blocks="introBody"></block-content>
    <div class="contact-container">
      <div class="contact-content">
        <div class="contact-label">
          <h3>{{ contactLabel }}</h3>
        </div>
        <div class="contact-list">
          <div
            v-for="location in contactDetails"
            :key="location.title"
            class="case-study-listing"
          >
            <h3>{{ location.name }}</h3>
            <ul>
              <li>{{ location.email }}</li>
              <li>{{ location.phone }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sanityClient from "../sanityClient";
import { contactQuery as query } from "../data/queries";
export default {
  async asyncData() {
    const pageData = await sanityClient.fetch(query);
    return {
      ...pageData.pageContent,
      contactDetails: pageData.contactDetails.contactDetails,
    };
  },
};
</script>
