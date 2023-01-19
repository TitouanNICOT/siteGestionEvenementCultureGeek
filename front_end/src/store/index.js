import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {NONCONNECTE} from "@/services/roles";
import {Stand} from "@/services/stands";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        stands: [],
        evenements: [],
        listeTypeStand: [],
        listeTypeProduit: [],
        currentUser: null,
    },
    getters: {
        listePresta(state) {
            return state.users.filter(user => user.idRole === 2)
        },
        currentRole(state) {
            if (state.currentUser)
                return state.currentUser.idRole
            return NONCONNECTE
        },
        currentTokenUser(state) {
            if (state.currentUser)
                return state.currentUser.token
            return ""
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setStands(state, stands) {
            state.stands = stands;
        },
        setEvenements(state, evenement) {
            state.evenements = evenement;
        },
        addStand(state, stand) {
            state.stands.push(stand);
        },
        setTypeStands(state, typeStands) {
            state.listeTypeStand = typeStands;
        },
        setTypeProduits(state, typeProduits) {
            state.listeTypeProduit = typeProduits;
        },
        removeStand(state, stand) {
            console.log(stand)
            const indexStand = state.stands.findIndex(s => s.id === stand);
            console.log(indexStand)
            state.stands.splice(indexStand, 1);
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        removeCurrentUser(state) {
            state.currentUser = null;
        }
    },
    actions: {
        loading(context) {
            console.log("debut chargement")
            axios.get("http://localhost:3000/stands/typeStand")
                .then(responce => {
                    if (responce.data.success === 1)
                        context.commit("setTypeStands", responce.data.data)
                })
            axios.get("http://localhost:3000/produits/listTypeProduit")
                .then(responce => {
                    if (responce.data.success === 1)
                        context.commit("setTypeProduits", responce.data.data)
                })
            axios.get("http://localhost:3000/evenements")
                .then(responce => {
                    if (responce.data.success === 1)
                        context.commit("setEvenements", responce.data.data)
                })
            axios.get("http://localhost:3000/users")
                .then(responce => {
                    if (responce.data.success === 1)
                        context.commit("setUsers", responce.data.data)
                })
            axios.get("http://localhost:3000/stands")
                .then(responce => {
                    if (responce.data.success === 1) {
                        const data = responce.data.data.map(d => Stand.fromAPI(d))
                        context.commit("setStands", data)
                    }
                })
            console.log("fin chargement")
        }
    },
    modules: {}
})
