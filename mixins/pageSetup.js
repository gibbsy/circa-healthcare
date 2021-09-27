import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanityClient";
import copyline from "~/components/span.vue";

const urlBuilder = imageUrlBuilder(sanityClient);

export default {
  transition: {
    name: "fade-pause",
    mode: "out-in",
  },
  data() {
    return {
      showUi: "",
      imgRes: { width: 1, height: 1, dpr: 1 },
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    texSuffix() {
      return this.isMobile ? "" : "-lrg";
    },
    cssVars() {
      const vars = this.theme.primaryColor.value
        ? {
            "--primary-color": this.theme.primaryColor.value,
            "--secondary-color": this.theme.secondaryColor.value,
            "--bg-texture": `var(--tex-${this.theme.texture}${this.texSuffix})`,
          }
        : {};
      return vars;
    },
  },
  mounted() {
    document.documentElement.style.setProperty(
      "--primary-color",
      this.theme.primaryColor.value
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      this.theme.secondaryColor.value
    );
    this.setImgRes();
    this.showUi = true;
  },
  methods: {
    urlFor(source) {
      return urlBuilder.image(source);
    },
    setImgRes() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      const res = {};
      if (width > 1440) {
        res.width = 1920;
        res.height = 1080;
      } else if (width > 1024) {
        res.width = 1440;
        res.height = 900;
      } else if (width >= 768) {
        res.width = 800;
      }
      res.height = Math.round(height * 0.8);
      if (this.isMobile) {
        // alert(width + " " + height);
        res.width = width;
        res.height = height;
      }
      this.imgRes = { ...res, dpr };
    },
    splitText() {
      Splitting({
        target: "[data-splitting]",
        key: null,
        by: "lines",
      });
    },
  },
};
