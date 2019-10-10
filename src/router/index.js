import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import About from '@/views/About'
import Home from '@/views/Home'
import User from '@/views/User'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },

  ]
})
