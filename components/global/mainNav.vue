<template>
  <div
    class="nav-full-screen-container section-container full-color"
    :style="cssVars"
  >
    <div :class="['inner-texture']"></div>
    <corner-logo :full-color="true" :delay="1"></corner-logo>
    <div
      :class="[
        'texture-pull-right',
        'reveal-slide-in',
        { 'is-inview': inView },
      ]"
    >
      <div
        class="inner-texture"
        data-scroll-parallax
        data-scroll-speed="0.5"
      ></div>
    </div>
    <div class="nav-content">
      <nav class="menu col-12 col-lg-4 offset-lg-1">
        <h6>Explore</h6>
        <ul>
          <li>
            <nuxt-link to="/" @click.native="clickFn">Home</nuxt-link>
          </li>
          <li v-for="link in links" :key="link.slug.current">
            <nuxt-link
              :to="`/${link.slug.current}`"
              @click.native="clickHandler"
              >{{ link.title }}</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <div class="contacts-container offset-lg-2">
        <div
          v-for="location in contactDetails"
          :key="location.name"
          class="nav-contacts-item"
        >
          <h6>{{ location.name }}</h6>
          <div class="infos">
            <a :href="`mailto:${location.email}`">{{ location.email }}</a>
            <p>{{ location.phone }}</p>
          </div>
        </div>
        <div class="nav-contacts-item">
          <h6>Social</h6>
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
  data() {
    return {
      inView: false,
    };
  },
  computed: {
    cssVars() {
      return {
        "--primary-color": `var(--anthracite)`,
        "--secondary-color": `var(--slate)`,
        "--bg-texture": `var(--tex-circuit)`,
      };
    },
  },
  mounted() {
    setTimeout(() => {
      this.inView = true;
    }, 500);
  },
  methods: {
    clickHandler() {
      setTimeout(() => {
        this.clickFn();
      }, 250);
    },
  },
};
</script>
