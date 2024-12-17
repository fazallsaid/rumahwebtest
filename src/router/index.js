import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:id',
    name: 'user-detail',
    component: DetailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
