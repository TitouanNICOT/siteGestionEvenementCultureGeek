<template>
  <v-row>
      <div>
          <v-btn v-for="(title, index) in titles" :key="index" @click="changeRouteId(index)"> {{ title.text }} </v-btn>
          <v-btn v-if="currentRole === ADMIN" color="grey">Liste Prestataire</v-btn>
          <v-btn v-if="currentRole === PRESTA" to="/prestataire">Tableau de bord</v-btn>
          <v-btn v-if="currentRole === CLIENT" to="/user">Mon Profil</v-btn>
      </div>
      <div style="margin-left: auto">
          <span>({{roles[currentRole]}} : {{ currentRole }})  </span>
          <v-btn v-if="currentUser==null" to="/login">Connection</v-btn>
          <span v-else>
              <span>{{currentUser.pseudo}}</span>
              <v-btn  @click="logout">Se déconnecter</v-btn>
          </span>
      </div>
  </v-row>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import router from "@/router";
import {roles, ADMIN, PRESTA,CLIENT} from "@/services/roles";

export default {
  name: 'NavBar',
    data() {
        return {
            titles:[{text: 'Home', color: 'grey', route:'/'}
                , {text: 'Carte', color: 'grey', route:'/carte'}
                , {text: 'Liste des Stands', color: 'grey', route:'/stand'}
                , {text: 'Liste des Evenements', color: 'grey', route:'/evenement'}],
            ADMIN,PRESTA,CLIENT,roles
        }
    },
    computed:{
        ...mapState(['currentUser']),
        ...mapGetters(['currentRole'])
    },
    methods: {
      ...mapMutations(['removeCurrentUser']),
        changeRouteId(id) {
            router.push(this.titles[id].route).catch(()=>{})
        },
        logout() {
            this.removeCurrentUser();
            this.$cookies.remove("currentUser");
            router.push('/').catch(()=>{});
        }
    }
}
</script>

<style scoped>
button{
    padding: 7px; margin: 7px;
}
</style>