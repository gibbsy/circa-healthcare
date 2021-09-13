<template>
  <div class="nav-full-screen-container" :style="cssVars">
    <div class="nav-content">
      <ul>
        <li>
          <nuxt-link to="/" @click.native="clickFn">Home</nuxt-link>
        </li>
        <li v-for="link in links" :key="link.slug.current">
          <nuxt-link :to="link.slug.current" @click.native="clickFn">{{
            link.title
          }}</nuxt-link>
        </li>
      </ul>
      <div class="nav-contacts-container">
        <div
          v-for="location in contactDetails"
          :key="location.name"
          class="nav-contacts-item"
        >
          <h3>{{ location.name }}</h3>
          <block-content :blocks="location.address"></block-content>
        </div>
        <div class="nav-contacts-item">
          <h3>Social</h3>
          <ul class="nav-socials-menu">
            <li v-for="link in socials" :key="link.title">
              <a :href="link.href">{{ link.title }}></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    contactDetails: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
    clickFn: {
      type: Function,
      default: () => [],
    },
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": "anthracite",
        "--secondary-color": "slate",
        "--bg-texture": `var(--tex-default);`,
      };
    },
  },
  mounted() {
    console.log(this.links);
  },
};
</script>
