// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import store from './store'
import 'vant/lib/vant-css/index.css'

Vue.config.productionTip = false
Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.onload = function () {
  setTimeout(function () {
    let needHide = document.getElementsByClassName('first-open')
    Array.prototype.forEach.call(needHide, function (div) {
      div.style.display = 'none'
    })
  }, 1500)
}
