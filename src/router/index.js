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
    path: '/about', 
    name: 'about',
    component: () => import('@/views/aboutView.vue')
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
    path: '/blog/cata/:cataName',
    name: 'cataView',
    component: () => import('@/views/blogCataView.vue')
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
