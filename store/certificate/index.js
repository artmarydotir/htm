/**
 * CERTIFICATE
 * STATE
 */

export const state = () => ({
  certificates: [],
  certificatesErrors: []
});

/**
 * CERTIFICATE
 * GETTERS
 */

export const getters = {
  // get certificate list
  getList(state) {
    return state.certificates;
  }
};

/**
 * CERTIFICATE
 * MUTATIONS
 */

export const mutations = {
  FETCH_LIST(state, payload) {
    state.certificates = payload;
  }
};

/**
 * CERTIFICATE
 * ACTIONS
 */

export const actions = {
  async fetchList({ commit }) {
    try {
      const res = await this.$axios.$get('/list1.json');
      commit('FETCH_LIST', res.data);
    } catch (e) {}
  }
};

// export const actions = {
//   async fetchAllJob({commit}) {
//     try {
//       const { data } = await api.job.getAllJob()
//       commit('index', data.data)
//       return data.data
//     } catch (error) {
//       commit('reset')
//     }
//   },

//   async fetchSpecificJob({commit}, params) {
//     try {
//       const { data } = await api.job.getSpecificJob(params.id)
//       commit('fetchOne', data.data)
//     } catch (error) {
//       commit('reset')
//     }
//   }
// }
// fetchOne(state, job) {
//   state.job = job;
// },

// reset(state) {
//   state.list = [];
//   state.job = {};
// }

// export default {
//   add(state, { text }) {
//     state.list.push({
//       text,
//       done: false
//     });
//   },

//   toggle(state, todo) {
//     todo.done = !todo.done;
//   }
// };
// export default {
//   todos(state) {
//     return state.list;
//   }
// };
