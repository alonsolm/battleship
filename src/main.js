import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Configuration from './components/Configuration'
import Board from './components/Board'
import EndGames from './components/EndGames'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

Vue.use(VueRouter);

Vue.config.productionTip = false


const routes = [
  { path: '/', redirect: '/configuration' },
  { name: 'configuration', path: '/configuration', component: Configuration, props: true },
  {
    name: 'board', path: '/board/:turns?', component: Board, props: true,
    beforeEnter: (to, from, next) => {
      if (!isNaN(to.params.turns)) {
        next();
      } else {
        next({ name: 'configuration' });
      }
    }
  },
  { path: '/end-games', component: EndGames }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
