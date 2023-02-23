<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Page not Found</h1>
                <p>Désolé, la page que vous essayer d'atteindre n'existe pas.</p>
                <div> Voici quelques liens utiles:
                    <ul>
                        <li>
                            <router-link to="/">Page d'accueil</router-link>
                        </li>
                        <li>
                            <router-link to="/evenement">Liste des évènements</router-link>
                        </li>
                        <li>
                            <router-link to="/prestataire">Liste des prestataires</router-link>
                        </li>
                        <li v-if="!currentUser">
                            <router-link to="/login">Se connecter</router-link>
                        </li>
                        <li v-if="currentRole === ADMIN()">
                            <router-link to="/admin">Liste des utilisateurs</router-link>
                        </li>
                        <li v-if="currentRole === PRESTA()">
                            <router-link to="/prestataire/home">Tableau de Bord</router-link>
                        </li>
                    </ul>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>


import {mapGetters, mapState} from "vuex";
import {ADMIN, PRESTA} from '@/services/roles';

export default {
    name: 'NotFoundView',
    methods: {
        ADMIN() {
            return ADMIN
        },
        PRESTA() {
            return PRESTA
        }
    },
    computed: {
        ...mapState(["currentUser"]),
        ...mapGetters(["currentRole"]),
    },
}
</script>
