import Vue from 'vue'
import VueRouter from 'vue-router'
import CarteView from '../views/CarteView.vue'
import AccueilView from "@/views/AccueilView";
import StandDetailView from "@/views/StandDetailView";
import StandView from "@/views/StandView";
import EvenementView from "@/views/EvenementView.vue";
import LoginView  from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BoutiqueView from "@/views/BoutiqueView";
// import {NONCONNECTE} from "@/services/roles";
// import store from "@/store";
//
// const checkAuthUser = (to,from,next) => {
//   console.log("debut verification")
//   if (store.getters.currentRole === NONCONNECTE) {
//     next({path: '/login'})
//   } else {
//     next()
//   }
// }

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
    path: '/stand',
    name: 'stands',
    component: StandView
  },
  {
    path: '/evenement',
    name: 'evenement',
    component: EvenementView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path:'/boutique/:idStand',
    name:'boutique',
    component: BoutiqueView
  },
  {
    path:'/reservations/:idStand/p/:idProduit',
    name:'reservation',
    component: () => import('../views/ReserverProduitView.vue'),
    // beforeEnter: checkAuthUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
