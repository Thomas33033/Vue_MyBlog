// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'

// Vue.use(VueAxios, axios)
Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$axios = axios
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:8080'
Vue.config.productionTip = false

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert(
        'vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看',
        '浏览器不兼容通知',
        {
          confirmButtonText: '确定'
        }
      )
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    // 设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      console.info(cname + '=' + cvalue + '; ' + expires)
      document.cookie = cname + '=' + cvalue + '; ' + expires
      console.info(document.cookie)
    },
    // 获取cookie
    getCookie: function (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('username', '', -1)
    },
    checkCookie: function () {
      var user = this.getCookie('username')
      if (user !== '') {
        alert('Welcome again ' + user)
      } else {
        user = prompt('Please enter your name:', '')
        if (user !== '' && user != null) {
          this.setCookie('username', user, 365)
        }
      }
    }
  }
}).$mount('#app')
