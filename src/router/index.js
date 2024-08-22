import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../resources/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../resources/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../resources/auth/Register.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../resources/Dashboard.vue')
    },
    {
      path: '/manager/teachers',
      name: 'teachers',
      component: () => import('../resources/teachers/ManagerTeacher.vue')
    },
    {
      path: '/manager/students',
      name: 'students',
      component: () => import('../resources/students/ManagerStudent.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../resources/profile/UserProfile.vue')
    },

  ]
})

export default router