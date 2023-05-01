import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import './assets/styles/styles.scss'
import Axios from 'axios'

Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
