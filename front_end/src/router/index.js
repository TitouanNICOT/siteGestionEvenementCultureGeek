import Vue from 'vue'
import VueRouter from 'vue-router'
import CarteView from '../views/CarteView.vue'
import HomeView from '../views/HomeView.vue'
import StandDetailView from "@/views/StandDetailView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/carte',
    name: 'carte',
    component: CarteView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/stand/:id',
    name: 'stand',
    component: StandDetailView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
