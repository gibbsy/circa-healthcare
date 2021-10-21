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
      serializers: {
        marks: {
          span: copyline,
        },
      },
    };
  },
  head() {
    const { siteTitle, siteDescription, ogImage } = this.siteConfig;
    const slug = this.metadata.slug || "";
    const title = this.metadata.title || siteTitle;
    const description = this.metadata.description || siteDescription;
    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          property: "og:locale",
          content: "en_GB",
          hid: "og:locale",
        },
        {
          property: "og:type",
          content: "website",
          hid: "og:type",
        },
        {
          property: "og:url",
          content: `https://www.circahealthcare.com/${slug}`,
          hid: "og:url",
        },
        {
          property: "og:site_name",
          content: "Circa Healthcare",
          hid: "og:site_name",
        },
        {
          property: "og:image",
          content: this.urlFor(ogImage.asset).width(1200).height(630).url(),
          hid: "og:image",
        },
        {
          property: "og:image:width",
          content: "1200",
          hid: "og:image_width",
        },
        {
          property: "og:image:height",
          content: "630",
          hid: "og:image_width",
        },
        {
          property: "og:title",
          content: title,
          hid: "og:title",
        },
        {
          property: "og:description",
          content: description,
          hid: "og:description",
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
          hid: "twitter:card",
        },
        {
          property: "twitter:title",
          content: title,
          hid: "twitter:title",
        },
        {
          property: "twitter:description",
          content: description,
          hid: "twitter:description",
        },
        {
          property: "twitter:image",
          content: this.urlFor(ogImage.asset).width(1200).height(630).url(),
          hid: "twitter:image",
        },
      ],
    };
  },
  computed: {
    siteConfig() {
      return this.$store.state.siteConfig;
    },
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
    urlFor(source) {
      return urlBuilder.image(source);
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
