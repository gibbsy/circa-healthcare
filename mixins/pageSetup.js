import copyline from "~/components/span.vue";

export default {
  transition: {
    name: "fade-pause",
    mode: "out-in",
  },
  data() {
    return {
      showUi: "",
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
    imgSizes() {
      return this.$store.state.imgSizes;
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
    this.showUi = true;
  },
  methods: {
    splitText() {
      Splitting({
        target: "[data-splitting]",
        key: null,
        by: "lines",
      });
    },
  },
};
