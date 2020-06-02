import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/router';
import store from './store/store'
// import api from './api/api';

Vue.use(ElementUI);
Vue.config.devtools = true;
Vue.config.productionTip = false;
// Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
