export const state = () => ({
  locale: 'en',
  listpost: [],
  dialog: false,
  listError: []
});

export const mutations = {
  fetchComments(state, payload) {
    state.listpost = payload;
  },
  fetchCommentsError(state, payload) {
    state.listError = payload;
  }
};

export const actions = {
  // fetchComments({ commit }) {
  //   return this.$axios
  //     .$get(`/list1.json`)
  //     .then((res) => {
  //       commit('fetchComments', res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       if (e) {
  //         commit('fetchCommentsError', e);
  //       }
  //     });
  // }
  // with async
  async fetchComments({ commit }) {
    try {
      const res = await this.$axios.$get('/list1.json');
      commit('fetchComments', res.data);
    } catch (e) {
      console.log(e);
      if (e) {
        commit('fetchCommentsError', e);
      }
    }
  }
};
