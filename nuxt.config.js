// import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanityClient";
// const urlBuilder = imageUrlBuilder(sanityClient);

/* function urlFor(source) {
  return urlBuilder.image(source);
}
 */
const title = "Circa Healthcare | A Strategic Healthcare Communications Agency";
const description =
  "We’re an award-winning creative agency that creates beautifully intelligent communications for farm, food and wellness clients all over the world.";
const queryRoutes = `
*[_id=="pageWork"][0]{ 
  theme,
  work[]->{slug},
}`;
async function dynamicRoutes(callback) {
  const routes = await sanityClient.fetch(queryRoutes);
  // const { work, theme } = routes;
  const { work } = routes;
  const arr = work.map((project) => {
    return `/case-study/${project.slug.current}`;
  });
  console.log(arr);
  callback(null, arr);
}
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  // ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title,
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large",
      },
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
        content: "https://www.circahealthcare.com",
        hid: "og:url",
      },
      {
        property: "og:site_name",
        content: "Circa Healthcare",
        hid: "og:site_name",
      },
      {
        property: "og:image",
        content: "https://www.circahealthcare.com/circa_thumbnail_large.jpg",
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
        content: "https://www.circahealthcare.com/circa_thumbnail_large.jpg",
        hid: "twitter:image",
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "theme-color", content: "#1a1a1a" },
    ],
    link: [
      { rel: "canonical", href: "https://www.circahealthcare.com" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
        rel: "stylesheet",
      },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/combine/npm/gsap@3.6.1,npm/@vimeo/player@2.15.0,npm/splitting@1.0.6,npm/imagesloaded@4.1.4/imagesloaded.pkgd.min.js,npm/gsap@3.6.1/dist/ScrollToPlugin.min.js,npm/gsap@3.6.1/dist/ScrollTrigger.min.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/style/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-gtag" },
    { src: "@/plugins/sanity-blocks.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/style-resources",
    "@nuxt/image",
  ],
  // https://image.nuxtjs.org/
  image: {
    provider: "sanity",
    sanity: {
      projectId: "j3kfzxis",
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
      hd: 1920,
    },
  },
  //  global scss vars https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: [
      "./assets/style/global/_global-vars.scss",
      "./assets/style/global/_mixins-utils.scss",
      "./assets/style/global/_mixins-layout.scss",
    ],
    // hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["cookie-universal-nuxt", "@nuxtjs/robots", "@nuxtjs/sitemap"],
  sitemap: {
    hostname: "https://www.circahealthcare.com",
    routes: dynamicRoutes,
  },
  robots: {
    UserAgent: "*",
    Disallow: "/cookie-and-privacy-policy",
    Sitemap: "https://www.circahealthcare.com/sitemap.xml",
  },
  generate: {
    routes: dynamicRoutes,
    fallback: "404.html",
  },
  build: {
    // transpile: ["gsap"],
    extend: (config) => {
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test(".svg")
      );

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: ["babel-loader", "vue-svg-loader"],
          },
          {
            loader: "file-loader",
            query: {
              name: "assets/[name].[hash:8].[ext]",
            },
          },
        ],
      });
    },

    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          // drop_console: true,
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
  },
};
