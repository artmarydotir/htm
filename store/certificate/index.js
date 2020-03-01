/**
 * CERTIFICATE
 * STATE
 */
export const state = () => ({
  certificates: [],
  certificatesErrors: [],
  getOneCert: {},
  todos: [],
  snackbar: {
    show: false,
    message: null,
    timeout: 100,
    color: null,
    e: []
  }
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
  SET_NOTIFICATION(state, payload) {
    console.log('payload', payload);
    console.log('state', state);
    state.snackbar = payload;
    // set(state, 'status', status);
    // Vue.set(state.snackbar, 'snackbar', payload);
  },
  SHOW_CERT(state, certId) {
    state.getOneCert = certId;
    console.log('im in mutation id', certId);
  },
  NEW: (state, singleTodo) => {
    state.todos.unshift(singleTodo);
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
  },
  async addTodo({ commit }, title) {
    try {
      const response = await this.$axios.post(
        'https://jsonplaceholder.typicode.com/photos',
        {
          title
        }
      );
      commit('NEW', response.data);
      commit('SET_NOTIFICATION', {
        show: true,
        color: 'green',
        message: 'success!'
      });
      // if(response.status == 200 || response.status == 204){
      //   commit('DELETE', video.id);
      // }
    } catch (e) {
      commit('SET_NOTIFICATION', {
        show: true,
        color: 'red',
        message: 'An error accrued!',
        e: e.name
      });
      console.log('oh hey');
    }
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
