<template>
    <div style=" padding: 20px" >
        <div>Selectionner le gagnant du match :
            <span v-if="selected">
                <v-btn @click="majTourTounois(joueur1)">{{ joueur1 }}</v-btn> ou
                <v-btn @click="majTourTounois(joueur2)">{{ joueur2 }}</v-btn>
            </span>
        </div>
        <TreeChart :json="info" v-if="false">
        </TreeChart>
        <VueTree :dataset="info"
                 :config="{ nodeWidth: 70, nodeHeight: 40, levelHeight: 120 }"
                 linkStyle="straight"
                 :collapse-enabled="false"
                 style="width:100%; height: 600px; border: 1px solid gray; margin: 0 auto;"
                 ref="vueTree">
            <template v-slot:node="{node}">
                <div class="node" :style="cssMethode(node)" @click="caseSelected(node)">
                    {{ formateAffichage(node) }}
                </div>
            </template>
        </VueTree>
    </div>
</template>

<script>
import myaxios from "@/services/axios";
import TreeChart from "vue-tree-chart";
import VueTree from "@ssthouse/vue-tree-chart";
import {mapState} from "vuex";

export default {
    name: "TournoiView",
    data: () => ({
        info: {},
        joueur1: "",
        joueur2: "",
        selected: false,
        node:undefined
    }),
    components: {TreeChart, VueTree},
    computed:{
        ...mapState(["users"])
    },
    methods:{
        formateAffichage(node){
            const user = this.users.find(u=>u.idUser=== node.idJoueur)
            return user ? user.pseudo +"\n"+ user.idUser : "-----"
        },
        cssMethode(node){
            let css = node.cote ? {position:"relative",left: node.cote==='1'? "-13px":"13px"} : {}
            if (node.gagne===1)
                css.backgroundColor= "gold"
            else if (node.gagne===-1)
                css.backgroundColor= "lightcoral"
            css.width = node.children ? "100px" : "85px"
            return css
        },
        caseSelected(node) {
            if (!node.idJoueur && node.children && node.children.length === 2) {
                this.selected = true
                this.joueur1 = node.children[0].idJoueur
                this.joueur2 = node.children[1].idJoueur
                this.node = node
            }else {
                this.selected = false
            }
        },
            majTourTounois(idJoueur){
                myaxios.get("/gestionTournoi/maj/"+this.node.idTour+"?idJoueur="+idJoueur)
                    .then(()=>{
                        this.selected = false
                        this.node.idJoueur = idJoueur
                        this.node.children.forEach(c=>c.gagne = c.idJoueur===idJoueur? 1:-1)
                    })
            }
        },

    created() {
        myaxios.get("/gestionTournoi/1").then((response) => {
            this.info = response.data.data;
        }).catch((error) => {
            console.log(error)
        });
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