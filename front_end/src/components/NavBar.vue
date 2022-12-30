<template>
  <v-row>
      <div>
          <button v-for="(title, index) in titles" :key="index" @click="changeRoute"> {{ title.text }} </button>
      </div>
      <div style="margin-left: auto">
          <button v-if="currentUser==null" @click="login">Connection</button>
          <div v-else>
              <span>Bienvenue {{currentUser.pseudo}}</span>
              <button  @click="logout">Se déconnecter</button>
          </div>
      </div>
  </v-row>
</template>

<script>
import { mapMutations, mapState} from "vuex";
import router from "@/router";

export default {
  name: 'NavBar',
    data() {
        return {
            titles:[{text: 'Home', color: 'grey', route:'/'}
                , {text: 'Carte', color: 'grey', route:'/carte'}
                , {text: 'Liste des Stands', color: 'grey', route:'/stand'}
                , {text: 'Liste des Evenements', color: 'grey', route:'/evenement'}]
        }
    },
    computed:{
        ...mapState(['currentUser']),
    },
    methods: {
      ...mapMutations(['removeCurrentUser']),
        changeRoute(id) {
            router.push(this.route[id].route);
        },
        login() {
            router.push('/login');
        },
        logout() {
            this.removeCurrentUser();
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