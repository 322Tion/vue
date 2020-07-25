import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫控制访问权限,
// 为路由对象，添加beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next（）放行   next('/login'）强制跳转
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage中获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token , 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
