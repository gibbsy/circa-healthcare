export const state = () => ({
  introPlayed: false,
});

export const mutations = {
  onIntroPlayed(state) {
    state.introPlayed = true;
  },
};
