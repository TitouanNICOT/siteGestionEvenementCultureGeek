<template>
  <v-row>
      <div>
          <button v-for="(title, index) in titles" :key="index" @click="changeRoute(index)"> {{ title.text }} </button>
          <button v-if="currentRole === ADMIN">Liste Prestataire</button>
          <button v-if="currentRole === PRESTA">Tableau de bord</button>
      </div>
      <div style="margin-left: auto">
          <span>({{role}} : {{ currentRole }})  </span>
          <button v-if="currentUser==null" @click="login">Connection</button>
          <span v-else>
              <span>Bienvenue {{currentUser.pseudo}}</span>
              <button  @click="logout">Se déconnecter</button>
          </span>
      </div>
  </v-row>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import router from "@/router";
import {roles, ADMIN, PRESTA} from "@/services/roles";

export default {
  name: 'NavBar',
    data() {
        return {
            titles:[{text: 'Home', color: 'grey', route:'/'}
                , {text: 'Carte', color: 'grey', route:'/carte'}
                , {text: 'Liste des Stands', color: 'grey', route:'/stand'}
                , {text: 'Liste des Evenements', color: 'grey', route:'/evenement'}],
            ADMIN,PRESTA
        }
    },
    computed:{
        ...mapState(['currentUser']),
        ...mapGetters(['currentRole']),
        role(){
            return roles.find(role => role.id === this.currentRole).name
        }
    },
    methods: {
      ...mapMutations(['removeCurrentUser']),
        changeRoute(id) {
            router.push(this.titles[id].route)
        },
        login() {
            router.push('/login');
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