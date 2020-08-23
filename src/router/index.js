import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/User/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/Home',
    component: Home,
    redirect: '/Welcome',
    children:
    [
      { path: '/Welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles }
    ]
  }
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