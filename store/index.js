export const state = () => ({
  isMobile: undefined,
  introPlayed: false,
  imgSizes: {
    hero: "xs:100vw sm:100vw md:100vw lg:50vw xl:50vw xxl:50vw hd:50vw",
    content:
      "xs:100vw sm:100vw md:100vw lg:1024px xl:1280px xxl:1600px hd:1920px",
    promo: "xs:100vw sm:100vw md:100vw lg:640px xl:960px xxl:1080px hd:1920px",
    poster: "xs:100vw lg:640px xl:960px xxl:1280px",
    scroller: "xs:100vw lg:500px xxl:600px hd:800px",
    clients: "xs:200px xxl:280px hd:300px",
  },
  defaultTheme: {},
});

export const mutations = {
  onIntroPlayed(state) {
    state.introPlayed = true;
  },
  setMobile(state, val) {
    state.isMobile = val;
  },
  setTheme(state, payload) {
    state.defaultTheme = payload;
  },
};
