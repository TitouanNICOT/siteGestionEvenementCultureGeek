<template>
    <v-data-table
        :headers="headers"
        :items="users"
    ></v-data-table>
</template>

<script>

import {mapState} from "vuex";

export default {
    name: 'HomeView',
    data() {
      return {
          headers: [
              {text: 'Nom',value: 'nom'},
              { text: 'Prénom', value: 'prenom' },
              { text: 'Email', value: 'email' },
              { text: 'Role', value: 'role.libelle' },
              // { text: 'Actions', value: 'actions', sortable: false },
          ],
      }
    },
    computed:{
        ...mapState(['users'])
    }
}
</script>
