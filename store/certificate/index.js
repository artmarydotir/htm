/**
 * CERTIFICATE
 * STATE
 */

export const state = () => ({
  certificates: [],
  certificatesErrors: [],
  getOneCert: {}
});

/**
 * CERTIFICATE
 * GETTERS
 */

export const getters = {
  // get certificate list
  getList(state) {
    return state.certificates;
  },
  getCert(state) {
    return state.getOneCert;
  }
};

/**
 * CERTIFICATE
 * MUTATIONS
 */

export const mutations = {
  FETCH_LIST(state, payload) {
    state.certificates = payload;
  },
  EDIT(state, payload) {
    state.certificates = payload;
  },
  SHOW_CERT(state, certId) {
    state.getOneCert = certId;
    console.log('im in mutation id', certId);
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
  },
  async edit({ commit }, fields) {
    try {
      const res = await this.$axios.$get(`/cert/edit/${fields.id}`, fields);
      commit('EDIT', res.data);
    } catch (e) {
      console.log(e);
    }
  },
  async showCert({ commit }, certId) {
    try {
      console.log('im in action id', certId);
      const response = await this.$axios.$get(
        `https://jsonplaceholder.typicode.com/photos/${certId}`
      );
      console.log(response);
      commit('SHOW_CERT', response);
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
