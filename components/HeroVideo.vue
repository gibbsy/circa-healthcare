<template>
  <div ref="container" class="content__video_wrapper autoplay wallpaper">
    <div
      ref="innerContainer"
      class="content__video_wrapper_inner autoplay wallpaper"
    >
      <div id="hero-bg-vid" ref="player" class="content__video wallpaper"></div>
    </div>
    <div class="video__overlay"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    playerId: {
      type: String,
      required: true,
    },
    vimeoId: {
      type: String,
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
      observer: "",
      playerEl: "",
      controller: "",
      poster: "",
      player: {},
      paused: true,
      inProgress: false,
      initialized: false,
      started: false,
    };
  },
  computed: {
    ...mapState({
      palette: (state) => state.main.palette,
      winSize: (state) => state.main.winSize,
    }),
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
      this.player = new Vimeo.Player("hero-bg-vid", this.playerOpts);
      this.initialized = true;
      // on "start" not firing on ipad chrome - must be to do with autoplay
      this.player.on("timeupdate", this.onStart);
    },
    onStart() {
      if (!this.started) {
        this.readyFn();
        this.started = true;
      }
      this.player.off("timeupdate", this.onStart);
    },
  },
};
</script>
<style lang="scss">
@import "~/assets/style/components/video";
</style>
