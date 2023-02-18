<template>
    <div style=" padding: 20px">
        <v-btn @click="$store.state.currentUser={idUser:1}">Debug Page</v-btn>
        <v-btn @click="genererTournois" v-if="!info && isOwner">Generer Tournois</v-btn>
        <VueTree v-else
                :dataset="info"
                 :config="{ nodeWidth: 70, nodeHeight: 40, levelHeight: 120 }"
                 linkStyle="straight"
                 :collapse-enabled="false"
                 style="width:100%; height: 600px; border: 1px solid gray; margin: 0 auto;"
                 ref="vueTree">
            <template v-slot:node="{node}">
                <div class="node" :style="cssMethode(node)">
                    <span v-if="nodeSelected(node) && isOwner">
                        <span v-for="(children,index) in node.children" :key="index">
                            <v-btn @click="majTourTounois(children.idJoueur,node)">
                                {{users.find(u => u.idUser === children.idJoueur).pseudo}}
                            </v-btn>
                            <span v-if="index < node.children.length-1"> OU </span>
                        </span>
                    </span>
                    <span v-else-if="users.find(u => u.idUser === node.idJoueur)">
                        {{formatUser(users.find(u => u.idUser === node.idJoueur))}}
                    </span>
                    <span v-else>
                        -----
                    </span>
                </div>
            </template>
        </VueTree>
    </div>
</template>

<script>
import myaxios from "@/services/axios";
import VueTree from "@ssthouse/vue-tree-chart";
import {mapState} from "vuex";

export default {
    name: "TournoiView",
    data: () => ({
        info: {}
    }),
    components: {VueTree},
    computed: {
        ...mapState(["users","currentUser","evenements"]),
        isOwner(){
            if (!(this.evenement && this.currentUser)) return false
            return this.currentUser.idUser === this.evenement.getIdPresta()
        },
        evenement(){
            return this.evenements.find(e => e.tournoi && e.tournoi.idTournoi === this.$route.params.idTournoi)
        }
    },
    methods: {
        formatUser(user) {
            return user.pseudo + "\n" + user.idUser
        },
        cssMethode(node) {
            let css = node.cote ? {position: "relative", left: node.cote === '1' ? "-13px" : "13px"} : {}
            if (node.gagne === 1)
                css.backgroundColor = "gold"
            else if (node.gagne === -1)
                css.backgroundColor = "lightcoral"
            // css.width = node.children ? "100px" : "85px"
            if (node.idTour===this.info.idTour){
                css.border = "5px dotted black"
                css.backgroundColor = "gold"
            }
            return css
        },
        nodeSelected(node) {
            if (node.idJoueur || !node.children) return false;
            for (const c of node.children)
                if (!c.idJoueur) return false
            return true;
        },
        majTourTounois(idJoueur, node) {
            myaxios.get("/gestionTournoi/maj/" + node.idTour + "?idJoueur=" + idJoueur)
                .then(() => {
                    node.idJoueur = idJoueur
                    node.children.forEach(c => c.gagne = c.idJoueur === idJoueur ? 1 : -1)
                })
        },
        genererTournois(){
            myaxios.post("/gestionTournoi/"+this.$route.params.idTournoi)
                .then(() => {
                    this.loadInfo()
                })
        },
        loadInfo(){
            myaxios.get("/gestionTournoi/"+this.$route.params.idTournoi).then((response) => {
                this.info = response.data.data;
            }).catch((error) => {
                console.log(error)
                if (error.response.status===404){
                    alert("Tournoi non trouvé")
                    this.$router.push("/")
                }
            });
        }
    },
    created() {
        this.loadInfo()
    },
    mounted() {
        console.log(this.$refs.vueTree.$data.initialTransformStyle.transform = "scale(1) translate(" + 1500 / 2 + "px, -50px)")
    }
}
</script>

<style scoped>
.node {
    border: 1px solid black;
    background-color: white;
    padding: 5px;
    text-align: center;
}
</style>