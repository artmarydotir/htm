// import Vue from 'vue';
// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'http://localhost:8081/',
//   json: true
// });

// export default {
//   async execute(method, resource, data) {
//     // inject the accessToken for each request
//     const accessToken = await Vue.prototype.$auth.getAccessToken();
//     return client({
//       method,
//       url: resource,
//       data,
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     }).then((req) => {
//       return req.data;
//     });
//   },
//   getPosts() {
//     return this.execute('get', '/posts');
//   },
//   getPost(id) {
//     return this.execute('get', `/posts/${id}`);
//   },
//   createPost(data) {
//     return this.execute('post', '/posts', data);
//   },
//   updatePost(id, data) {
//     return this.execute('put', `/posts/${id}`, data);
//   },
//   deletePost(id) {
//     return this.execute('delete', `/posts/${id}`);
//   }
// };

// export const todos = {
//   getTodos(id) {
//     return axios.get(`https://jsonplaceholder.typicode.com//todos/${id}`).then(resp => resp.data)
//   }
// };

// export default {
//   // auth: {
//   //   signin: (data) => axios.post('auth/signin', data),
//   //   register: (data) => axios.post('auth/signup', data),
//   //   profile: () => axios.get('me')
//   // },
//   certificate: {
//     // postJob: (data) => axios.post('job', data),
//     // getAllList: () => axios.get('https://jsonplaceholder.typicode.com/todos/')
//     getAllList() {
//       return axios
//         .get(`https://jsonplaceholder.typicode.com/todos/`)
//         .then((resp) => resp.data);
//     }
//     // getSpecificJob: (id) => axios.get(`job/${id}`),
//     // deleteSpecificJob: (id) => axios.get(`job/${id}`),
//     // updateSpecificJob: (id, data) => axios.post(`job/${id}`, data)
//   }
// };
// export default {
//   create(payload) {},

//   show(id) {},

//   async index() {

//   },

//   update(payload, id) {},

//   delete(id) {}
// };
