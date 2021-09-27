export const state = () => ({
  isMobile: undefined,
  introPlayed: false,
});

export const mutations = {
  onIntroPlayed(state) {
    state.introPlayed = true;
  },
  setMobile(state, val) {
    state.isMobile = val;
  },
};
