import Vue from 'vue'
import Vuex from 'vuex'
import myaxios from "@/services/axios";
import {NONCONNECTE} from "@/services/roles";
import Stand from "@/services/stands";
import Evenement from "@/services/evenements";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        stands: [],
        evenements: [],
        listeTypeStand: [],
        listeTypeEvenement: [],
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
        addEvenement(state, evenement) {
            evenement.setStand( state.stands.find(stand => stand.id === evenement.idStand) )
            state.evenements.push(evenement)
        },
        addStand(state, stand) {
            state.stands.push(stand);
        },
        setTypeStands(state, typeStands) {
            state.listeTypeStand = typeStands;
        },
        setTypeEvenement(state, typeEvenement) {
            state.listeTypeEvenement = typeEvenement;
        },
        setTypeProduits(state, typeProduits) {
            state.listeTypeProduit = typeProduits;
        },
        removeStand(state, stand) {
            const indexStand = state.stands.findIndex(s => s.id === stand);
            state.stands.splice(indexStand, 1);
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        removeCurrentUser(state) {
            state.currentUser = null;
        },
        linkStandAndEvent(state) {
            console.log(state.stands)
            console.log(state.evenements)
            state.evenements.forEach(event => {
                event.setStand( state.stands.find(stand => stand.id === event.idStand) )
            })
        }
    },
    actions: {
        async loading(context) {
            console.log("debut chargement")
            try {
                var res = await myaxios.get("/stands/typeStand")
                context.commit("setTypeStands", res.data.data)

                res = await myaxios.get("/produits/listTypeProduit")
                context.commit("setTypeProduits", res.data.data)

                res = await myaxios.get("/evenements/listTypeEvenement")
                context.commit("setTypeEvenement", res.data.data)

                res = await myaxios.get("/users")
                context.commit("setUsers", res.data.data)

                res = await myaxios.get("/evenements")
                var data = res.data.data.map(d => Evenement.fromAPI(d))
                context.commit("setEvenements", data)

                res = await myaxios.get("/stands")
                data = res.data.data.map(d => Stand.fromAPI(d))
                context.commit("setStands", data)

                context.commit("linkStandAndEvent")
            }catch (e) {
                alert("Erreur lors du chargement des données")
            }
            console.log("fin chargement")
        }
    },
    modules: {}
})
