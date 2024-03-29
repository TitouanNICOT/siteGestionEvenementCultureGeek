import Vue from 'vue'
import VueRouter from 'vue-router'
import CarteView from '../views/CarteView.vue'
import AccueilView from "@/views/AccueilView";
import StandDetailView from "@/views/stands/StandDetailView";
import StandView from "@/views/stands/StandView";
import EvenementView from "@/views/evenements/EvenementView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BoutiqueView from "@/views/BoutiqueView";
import HomePrestaView from "@/views/users/HomePrestaView";
import cookies from "vue-cookies";
import {ADMIN, PRESTA, CLIENT} from "@/services/roles";
import HomeAdminView from "@/views/users/HomeAdminView";
import ProfilUserView from "@/views/users/ProfilUserView.vue";
import PrestaPublicView from "@/views/users/PrestaPublicView.vue";
import EvenementDetailView from "@/views/evenements/EvenementDetailView.vue";
import ListBoutique from "@/views/ListBoutique";
import ListPresta from "@/views/ListPresta";
import NewEventView from "@/views/evenements/NewEventView.vue";
// import TestListDataView from "@/views/TestListDataView";

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
        path: '/stand/:id/nouvelleEvenement',
        name: 'nouvelleEvenement',
        component: NewEventView
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
        path: '/evenement/:id',
        name: 'evenementById',
        component: EvenementDetailView
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
        path: '/boutique',
        name: 'boutiques',
        component: ListBoutique
    },
    {
        path: '/boutique/:idStand',
        name: 'boutique',
        component: BoutiqueView
    },
    {
        path: '/prestataire',
        name: 'prestataire',
        component: ListPresta,
    },
    {
        path: '/prestataire/home',
        name: 'HomePrestataire',
        component: HomePrestaView,
        meta: { requiresAuth: true ,role:PRESTA}
    },
    {
        path:'/admin',
        name:'admin',
        component: HomeAdminView,
        meta: { requiresAuth: true ,role: ADMIN}
    },
    {
        path:'/user',
        name:'user',
        component: ProfilUserView,
        meta: { requiresAuth: true ,role:CLIENT}
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('../views/evenements/TimelineView.vue')
    },
    {
        path: '/infosPresta/:idUser',
        name: 'infosPresta',
        component: PrestaPublicView,
        props:true
    },
    {
        path: '/pageStatistique',
        name: 'pageStatistique',
        component: () => import('../views/PageStatTemp.vue')
    },
    {
        path: '/tournoi/:idTournoi',
        name: 'vueTournoi',
        component: () => import('../views/TournoiView.vue')
    },
    {
        path: '/gestionParticipant',
        name: 'gestionParticipant',
        component: () => import('../components/GestionParticipant.vue')
    },
    {
        path: '/*',
        name: 'notFound',
        component: () => import('../views/NotFoundView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth) {
        //recuperation des cookies user directement
        //car la verif du router se passe avant le create() de App et donc avant le chargement du store
        //en cas de rechargement de page
        const currentUser = cookies.get("currentUser");
        if (!currentUser)
            next({path: '/login'})
        else if (!to.meta.roles || to.meta.role===currentUser.idRole)
            next()
        else
            next({path: '/login'})
    } else
        next()
})

export default router
