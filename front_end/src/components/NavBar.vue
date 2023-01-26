<template>
  <v-row>
      <div>
          <v-btn v-for="(title, index) in titles" :key="index" @click="changeRouteId(index)"> {{ title.text }} </v-btn>
          <v-btn v-if="currentRole === ADMIN" to="/admin">Liste utilisateur</v-btn>
          <v-btn v-if="currentRole === PRESTA" to="/prestataire/home">Tableau de bord</v-btn>
          <v-btn v-if="currentRole === CLIENT" to="/user">Mon Profil</v-btn>
      </div>
      <div style="margin-left: auto">
<!--          <span>({{roles[currentRole]}} : {{ currentRole }})  </span>-->
          <v-btn v-if="currentUser==null" @click="connexion">Connexion</v-btn>
          <span v-else>
              <span>{{currentUser.pseudo}}</span>
              <v-btn  @click="logout">Se déconnecter</v-btn>
          </span>
      </div>
  </v-row>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import {roles, ADMIN, PRESTA,CLIENT} from "@/services/roles";

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
            ADMIN, PRESTA, CLIENT, roles
        }
    },
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
        connexion(){
            this.$router.push({name:'login',query:{redirect:this.$route.path}})
        }
    }
}
</script>

<style scoped>
button {
    padding: 4px;
    margin: 4px;
}
</style>