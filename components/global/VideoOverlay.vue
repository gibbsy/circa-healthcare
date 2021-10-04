<template>
  <div ref="modal" class="intro-video-modal">
    <transition name="fade" appear>
      <div
        v-if="showMsg === true && started === false"
        class="loading-msg flex--centred"
      >
        <p>Please wait, loading.</p>
      </div>
    </transition>
    <div class="content-video_wrapper autoplay wallpaper">
      <div
        ref="innerContainer"
        class="content-video-wrapper-inner autoplay wallpaper"
      >
        <div id="intro-vid" ref="player" class="content-video wallpaper"></div>
      </div>
    </div>
    <transition name="fade" appear>
      <div v-if="started" class="nav-primary-fixed">
        <button
          class="intro-close-btn"
          aria-label="Close overlay"
          @click.prevent="doneFn"
        >
          <span />
          <span />
        </button>
      </div>
    </transition>
    <transition name="fade" appear>
      <button
        v-if="started"
        class="intro-sound-btn"
        @click.prevent="soundToggle"
      >
        <speaker-icon class="speaker-icon"></speaker-icon>
        <span class="audio-on" :class="{ on: !muted }"></span>
        <span class="audio-off" :class="{ on: muted }"></span>
      </button>
    </transition>
  </div>
</template>
<script>
import SpeakerIcon from "~/assets/icon_speaker.svg?inline";
export default {
  components: {
    SpeakerIcon,
  },
  props: {
    vimeoId: {
      type: String,
      required: true,
    },
    readyFn: {
      type: Function,
      default: () => {},
    },
    doneFn: {
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
      muted: true,
      timeout: "",
      showMsg: true,
    };
  },
  computed: {
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
        loop: false,
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
      this.player.off("play", this.doneFn);
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
        this.player = new Vimeo.Player("intro-vid", this.playerOpts);
        this.initialized = true;
        // on "start" not firing on ipad chrome - must be to do with autoplay
        this.player.on("timeupdate", this.onStart);
        this.player.on("ended", this.onEnded);
        this.timeout = setTimeout(() => {
          if (!this.started) {
            this.onEnded();
          }
        }, 6000);
      }
    },
    onStart() {
      if (!this.started) {
        clearTimeout(this.timeout);
        this.readyFn();
        this.started = true;
        this.showMsg = false;
      }
      this.player.off("timeupdate", this.onStart);
    },
    onEnded() {
      this.player.off("timeupdate", this.onStart);
      this.player.off("ended", this.onEnded);
      this.doneFn();
    },
    soundToggle() {
      if (this.muted === true) {
        this.player.setVolume(0.5);
        this.muted = false;
      } else {
        this.player.setVolume(0);
        this.muted = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/style/components/video-overlay";
</style>
