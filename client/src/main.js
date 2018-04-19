// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import VueMq from 'vue-mq'

Vue.config.productionTip = false
router.mode = 'history'
Vue.use(Vuetify)
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 576,
    md: 1250,
    lg: Infinity
  }
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
