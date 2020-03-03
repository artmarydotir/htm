/**
 *  VIRTUAL HOST
 * STATE
 */
export const state = () => ({
  vh: []
});

/**
 * VIRTUAL HOST
 * GETTERS
 */

export const getters = {
  getList(state) {
    return state.certificates;
  }
};

/**
 * VIRTUAL HOST
 * MUTATIONS
 */

export const mutations = {
  FETCH_VH_LIST(state, payload) {
    state.vh = payload;
  }
};

/**
 * VIRTUAL HOST
 * ACTIONS
 */

export const actions = {
  async fetchVirtuals({ commit }) {
    try {
      const res = await this.$axios.$get('/vh.json');
      commit('FETCH_VH_LIST', res.data);
    } catch (e) {
      console.log(e);
    }
  }
};
