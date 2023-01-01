import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        stands: [],
        evenements: [],
        listeTypeStand: [],
        currentUser: null,
    },
    getters: {
        listePresta(state) {
            return state.users.filter(user => user.idRole === 2)
        }
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
        },
        setStands(state, stands) {
            state.stands = stands;
        },
        addStand(state, stand) {
            state.stands.push(stand);
        },
        setTypeStands(state, typeStands) {
            state.listeTypeStand = typeStands;
        },
        removeStand(state, stand) {
            const indexStand = state.stands.indexOf(stand);
            state.stands.splice(indexStand, 1);
            // state.stands = state.stands.filter(stand => stand.idStand != idStand);
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
            axios.get("http://localhost:3000/users")
                .then(responce => {
                    if (responce.data.success === 1)
                        context.commit("setUsers", responce.data.data)
                })
            axios.get("http://localhost:3000/stands")
                .then(responce => {
                    if (responce.data.success === 1) {
                        const datas = []
                        responce.data.data.forEach(d => datas.push({
                            id: d.idStand.toString(),
                            nomStand: d.nomStand,
                            couleur: "red",
                            description: d.descriptionStand,
                            prestataire: d.user === null ? "null" : d.user.nom + " " + d.user.prenom,
                        }))
                        context.commit("setStands", datas)
                    }
                })
            console.log("fin chargement")
        }
    },
    modules: {}
})
