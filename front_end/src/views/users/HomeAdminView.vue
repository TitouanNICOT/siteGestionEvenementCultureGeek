<template>
    <v-data-table :headers="headers" :items="users" style="margin: 40px">
        <template v-slot:[`item.actions`]="{item}">
            <v-btn v-if="item.idRole===CLIENT" @click="goPresta(item.idUser)">Passer Prestataire</v-btn>
            <span v-else>Pas d'action possible</span>
        </template>
    </v-data-table>
</template>

<script>

import {mapState} from "vuex";
import {CLIENT, PRESTA} from "@/services/roles";
import myaxios from "@/services/axios";

export default {
    name: 'HomeView',
    data() {
        return {
            headers: [
                {text: 'Nom', value: 'nom'},
                {text: 'Prénom', value: 'prenom'},
                {text: 'Pseudo', value: 'pseudo'},
                {text: 'Email', value: 'email'},
                {text: 'Role', value: 'role.libelle'},
                {text: 'Actions', value: 'actions', sortable: false}
            ],
            CLIENT
        }
    },
    computed: {
        ...mapState(['users'])
    },
    methods: {
        goPresta(idUser) {
            myaxios.patch('/users/' + idUser, {
                idRole: PRESTA
            }).then(() => {
                this.$store.state.users.find(user => user.idUser === idUser).idRole = PRESTA;
                this.$store.state.users.find(user => user.idUser === idUser).role.libelle = "prestataire";
                this.$store.state.users.find(user => user.idUser === idUser).role.idRole = PRESTA;
                alert("Prestataire maj");
            }).catch(() => {
                alert("Erreur lors de la création du prestataire");
            });
        }
    }
}
</script>
