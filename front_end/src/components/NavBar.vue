<template>
    <div>
        <v-navigation-drawer
            :value="drawer"
            absolute
            width="20%"
            height="100%"
            color="var(--primary-color)"
            dark>
            <v-list>
                <img class="logo" src="/GEEKY_EVENT.png" alt=""/>
                <v-list-item v-for="(title, index) in titles" :key="index" @click="changeRouteId(index)">
                    <v-list-item-title> {{ title.text }}</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="currentRole === ADMIN" to="/admin">
                    <v-list-item-title>Liste utilisateur</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="currentRole === PRESTA" to="/prestataire/home">
                    <v-list-item-title>Tableau de bord</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="currentRole === CLIENT" to="/user">
                    <v-list-item-title>Mon Profil</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app
                   hide-on-scroll
                   color="var(--primary-color)"
                   dark>

            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <div v-if="currentUser==null">
                <v-btn outlined style="color: white" @click="connexion">Connexion</v-btn>
            </div>
            <div v-else style="display: flex">
                <span style="margin: 8px">{{ currentUser.pseudo }}</span>
                <v-btn @click="logout" outlined>Se déconnecter</v-btn>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import {roles, ADMIN, PRESTA, CLIENT} from "@/services/roles";

export default {
    name: 'NavBar',
    data() {
        return {
            titles: [{text: 'Home', color: 'grey', route: '/'}
                , {text: 'Carte', color: 'grey', route: '/carte'}
                , {text: 'L stands', color: 'grey', route: '/stand'}
                , {text: 'L evenements', color: 'grey', route: '/evenement'}
                , {text: 'L boutiques', color: 'grey', route: '/boutique'}
                , {text: 'L prestataires', color: 'grey', route: '/prestataire'}
                , {text: 'Timeline', color: 'grey', route: '/timeline'}
                , {text: 'Contact', color: 'grey', route: '/contact'}
            ],
            ADMIN, PRESTA, CLIENT, roles,
            drawer: false
        }
    },
    // props: {
    //     drawer: {
    //       type: Boolean
    //     }
    // },
    computed: {
        ...mapState(['currentUser']),
        ...mapGetters(['currentRole'])
    },
    methods: {
        ...mapMutations(['removeCurrentUser']),
        changeRouteId(id) {
            this.$router.push(this.titles[id].route).catch(() => {
            })
        },
        logout() {
            this.removeCurrentUser();
            this.$cookies.remove("currentUser");
            this.$router.push('/').catch(() => {
            });
        },
        connexion() {
            console.log("aaaa")
            this.$router.push({name: 'login', query: {redirect: this.$route.path}})
        }
    }
}
</script>

<style scoped>
button {
    padding: 4px;
    margin: 4px;
}

.logo {
    width: 100px;
    height: 100%;
    /*z-index: 1;*/
    margin-top: 10px;
    margin-left: 60px;
    /*margin-bottom: 125px;*/
}
</style>