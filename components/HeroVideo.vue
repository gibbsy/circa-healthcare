<template>
  <div ref="container" class="content-video-wrapper autoplay wallpaper">
    <div
      ref="innerContainer"
      class="content-video-wrapper-inner autoplay wallpaper"
    >
      <figure v-if="fallback" id="poster-wrapper" class="poster-wrapper">
        <nuxt-img
          ref="poster"
          class="hero-poster"
          :src="poster.asset._ref"
          :sizes="imgSizes.poster"
          :modifiers="{ quality: 30 }"
        ></nuxt-img>
      </figure>
      <div id="hero-bg-vid" ref="player" class="content-video wallpaper"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    vimeoId: {
      type: String,
      default: "",
      required: true,
    },
    poster: {
      type: Object,
      default: () => {},
      required: true,
    },
    readyFn: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      container: "",
      playerEl: "",
      player: {},
      paused: true,
      inProgress: false,
      initialized: false,
      started: false,
      timeout: "",
      fallback: false,
    };
  },
  computed: {
    imgSizes() {
      return this.$store.state.imgSizes;
    },
    playerOpts() {
      return {
        id: this.vimeoId,
        width: 1280,
        byline: false,
        muted: true,
        autoplay: true,
        autopause: !this.autopause,
        portrait: false,
        title: false,
        controls: false,
        loop: true,
      };
    },
    videoUri() {
      return encodeURI(`https://vimeo.com/${this.vimeoId}`);
    },
  },
  mounted() {
    this.playerEl = this.$refs.player;
    this.container = this.$refs.container;
    this.init();
  },
  beforeDestroy() {
    if (this.initialized) {
      this.player.off("play", this.readyFn);
      this.player.destroy();
    }
  },
  methods: {
    init() {
      if (!this.vimeoId) {
        setTimeout(() => {
          this.init();
        }, 250);
      } else {
        this.player = new Vimeo.Player("hero-bg-vid", this.playerOpts);
        this.initialized = true;
        this.player.on("timeupdate", this.onStart);
        // fallback timeout
        // load a static image fallback
        this.timeout = setTimeout(() => {
          if (!this.started) {
            this.fallback = true;
            this.$nextTick(() => {
              this.initFallback();
            });
          }
        }, 3000);
      }
    },
    initFallback() {
      this.onStart();
      document.getElementById("poster-wrapper").classList.add("ani");
    },
    onStart() {
      if (!this.started) {
        clearTimeout(this.timeout);
        this.readyFn();
        this.started = true;
      }
      this.player.off("timeupdate", this.onStart);
    },
  },
};
</script>
