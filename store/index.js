export const state = () => ({
  isMobile: undefined,
  introPlayed: false,
  imgSizes: {
    hero: "xs:100vw sm:100vw md:100vw lg:50vw xl:50vw xxl:50vw hd:50vw",
    content: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw hd:100vw",
  },
  caseStudies: [],
});

export const mutations = {
  onIntroPlayed(state) {
    state.introPlayed = true;
  },
  setMobile(state, val) {
    state.isMobile = val;
  },
  setCaseStudies(state, payload) {
    state.caseStudies = payload;
  },
};
