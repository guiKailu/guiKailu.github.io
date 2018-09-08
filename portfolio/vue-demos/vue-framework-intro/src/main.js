import Vue from 'vue'
import App from './App.vue'
import User from './components/User.vue'

Vue.use(VueRouter);

const routes = [
    {path: '/', component: User},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

Vue.component('app-user', User);



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
