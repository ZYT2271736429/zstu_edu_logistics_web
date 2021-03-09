import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import { postRequest, getRequest } from './utils/api'
import { initMenu } from './utils/menus'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.postRequest = postRequest
Vue.prototype.getRequest = getRequest

/* 路由导航守卫 */
router.beforeEach((to, from, next) => {
/*  if (to.path == '/') {
    next()
  } else { */
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    next()
  } else {
    next()
    // next('/?redirect=' + to.path)
  }
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
