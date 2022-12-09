import Vue from 'vue'
import VueRouter from 'vue-router'
import CarteView from '../views/CarteView.vue'
import AccueilView from "@/views/AccueilView";
import StandDetailView from "@/views/StandDetailView";
import EvenementView from "@/views/EvenementView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/carte',
    name: 'carte',
    component: CarteView
  },
  {
    path: '/',
    name: 'Accueil',
    component: AccueilView
  },
  {
    path: '/stand/:id',
    name: 'stand',
    component: StandDetailView
  },
  {
    path: '/evenement',
    name: 'evenement',
    component: EvenementView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
