import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import Axios from 'axios';

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8000/api/v1';
Vue.prototype.$http.defaults.headers = {
  token: localStorage.getItem('token')
}

let globalData = new Vue({
  data: {
    token: '',
    fullname: '',
  }
});

Vue.use(VueRouter);
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    token: {
      get: function () {
        return localStorage.getItem('token');
      },
      set: function (newToken) {
        localStorage.setItem('token', newToken);
        Vue.prototype.$http.defaults.headers = {
          token: localStorage.getItem('token')
        }
      }
    },
    fullname: {
      get: function () {
        return globalData.$data.fullname;
      },
      set: function (newName) {
        globalData.$data.fullname = newName;
      }
    }
  }
})

let router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
