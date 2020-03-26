import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/assets/icon-font/iconfont.css'
import moment from 'moment'
Vue.config.productionTip = false
Vue.use(ViewUI);

Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})

// 自定义指令
// Vue.directive('hello',function(el,binding,vnode){
//   el.style["color"] = binding.value
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
