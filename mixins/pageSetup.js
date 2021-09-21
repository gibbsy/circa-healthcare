import imageUrlBuilder from "@sanity/image-url";
import mobile from "is-mobile";
import sanityClient from "../sanityClient";
import Logo from "~/assets/circa_logo_nofill.svg?inline";
import copyline from "~/components/span.vue";

const urlBuilder = imageUrlBuilder(sanityClient);

export default {
  transition: {
    name: "fade-pause",
    mode: "out-in",
  },
  components: { Logo },
  data() {
    return {
      isMobile: "",
      imgRes: { width: 1, height: 1, dpr: 1 },
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  computed: {
    cssVars() {
      const vars = this.theme.primaryColor.value
        ? {
            "--primary-color": this.theme.primaryColor.value,
            "--secondary-color": this.theme.secondaryColor.value,
            "--bg-texture": `var(--tex-${this.theme.texture})`,
          }
        : {};
      return vars;
    },
  },
  mounted() {
    if (mobile({ tablet: true, featureDetect: true })) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    document.documentElement.style.setProperty(
      "--primary-color",
      this.theme.primaryColor.value
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      this.theme.secondaryColor.value
    );
    this.setImgRes();
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
