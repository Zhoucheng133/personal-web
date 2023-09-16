import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/homeView.vue")
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/blogView.vue')
  },
  {
    path: '/dev',
    name: 'dev',
    component: () => import('@/views/devView.vue')
  },
  {
    path: '/about', 
    name: 'about',
    component: () => import('@/views/aboutView.vue')
  },
  {
    path: '/m',
    name: "mobile home",
    component: () => import('@/views/mobileViews/homeView_m.vue')
  },
  {
    path: '/m/blog',
    name: 'mobile blog',
    component: () => import('@/views/mobileViews/blogView_m.vue')
  },
  {
    path: '/m/dev',
    name: 'mobile dev',
    component: () => import('@/views/mobileViews/devView_m.vue')
  },
  {
    path: '/m/about',
    name: 'mobile about',
    component: () => import('@/views/mobileViews/aboutView_m.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboardView.vue')
  },
  {
    path: '/dashboard/login',
    name: 'login',
    component: () => import('@/views/loginView.vue')
  },
  {
    path: '/blog/:id',
    name: 'blogContent',
    component: () => import('@/views/blogContent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
