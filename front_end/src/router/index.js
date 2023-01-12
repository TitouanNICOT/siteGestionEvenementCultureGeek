import Vue from 'vue'
import VueRouter from 'vue-router'
import CarteView from '../views/CarteView.vue'
import AccueilView from "@/views/AccueilView";
import StandDetailView from "@/views/StandDetailView";
import StandView from "@/views/StandView";
import EvenementView from "@/views/EvenementView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BoutiqueView from "@/views/BoutiqueView";
import HomePrestaView from "@/views/HomePrestaView";
import cookies from "vue-cookies";
import {PRESTA} from "@/services/roles";

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
        path: '/boutique/:idStand',
        name: 'boutique',
        component: BoutiqueView
    },
    {
        path: '/reservations/:idStand/p/:idProduit',
        name: 'reservation',
        component: () => import('../views/ReserverProduitView.vue'),
        meta: {requiresAuth: true},
    },
    {
        path: '/prestataire',
        name: 'prestataire',
        component: HomePrestaView,
        meta: {requiresAuth: true, role: PRESTA}
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('../views/TimelineTestView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        //recuperation des cookies user directement,
        //car la verif du router se passe avant le create() de App et donc avant le chargement du store
        //en cas de rechargement de page
        const currentUser = cookies.get("currentUser");
        if (!currentUser)
            next({path: '/login'})
        else if (!to.meta.roles || to.meta.role === currentUser.idRole)
            next()
        else
            next({path: '/login'})
    } else
        next()
})

export default router
