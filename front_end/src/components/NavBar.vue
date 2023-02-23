<template>
    <div>
        <v-navigation-drawer
            :value="drawer"
            absolute
            width="20%"
            height="100vh"
            color="var(--primary-color)"
            dark
            style="z-index: 2"
            class="sidebar">
          <v-list class="" style="padding-top: 40%">
                <img class="logo" src="/GEEKY_EVENT.png" alt=""/>
                <v-list-item style="margin-bottom: 15px" v-if="currentRole === ADMIN" to="/admin">
                    <v-icon style="margin: 10px">mdi-account-multiple</v-icon>
                    <v-list-item-title>Liste utilisateur</v-list-item-title>
                </v-list-item>
                <v-list-item style="margin-bottom: 15px" v-if="currentRole === PRESTA" to="/prestataire/home">
                    <v-icon style="margin: 10px">mdi-view-dashboard</v-icon>
                    <v-list-item-title>Tableau de bord</v-list-item-title>
                </v-list-item>
                <v-list-item style="margin-bottom: 15px" v-if="currentRole === CLIENT" to="/user">
                    <v-icon style="margin: 10px">mdi-account</v-icon>
                    <v-list-item-title>Mon Profil</v-list-item-title>
                </v-list-item>
                <v-list-item v-for="(title, index) in titles" :key="index" @click="changeRouteId(index)">
                    <v-icon style="margin: 10px">{{ title.icon }}</v-icon>
                    <v-list-item-title> {{ title.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app
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
            titles: [{text: 'Home', icon: 'mdi-home', color: 'grey', route: '/'}
                , {text: 'Carte', icon: 'mdi-map-marker', color: 'grey', route: '/carte'}
                , {text: 'Liste des stands', icon: 'mdi-store', color: 'grey', route: '/stand'}
                , {text: 'Liste des événements', icon: 'mdi-calendar', color: 'grey', route: '/evenement'}
                , {text: 'Liste des boutiques', icon: 'mdi-cart', color: 'grey', route: '/boutique'}
                , {text: 'Liste des prestataires', icon: 'mdi-account-tie', color: 'grey', route: '/prestataire'}
                , {text: 'Timeline', icon: 'mdi-timeline-clock-outline', color: 'grey', route: '/timeline'}
                , {text: 'Contact', icon: 'mdi-email', color: 'grey', route: '/contact'}
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
            this.drawer = false;
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
    margin-top: 10px;
    margin-left: 100px;
    padding-bottom: 50px;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
}
</style>
