import Vue from 'vue'
import VueGraph from 'vue-graph'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueGraph)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
