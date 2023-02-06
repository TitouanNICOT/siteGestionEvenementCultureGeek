<template>
    <div style=" padding: 20px" >
        <TreeChart :json="info" v-if="false">
        </TreeChart>
        <VueTree :dataset="info"
                 :config="{ nodeWidth: 70, nodeHeight: 40, levelHeight: 120 }"
                 linkStyle="straight"
                 style="width:100%; height: 600px; border: 1px solid gray; margin: 0 auto;"
                 ref="vueTree">
            <template v-slot:node="{node}">
                <div class="node" :style="cssMethode(node)">
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
        info: {}
    }),
    components: {TreeChart, VueTree},
    computed:{
        ...mapState(["users"])
    },
    methods:{
        formateAffichage(node){
            const user = this.users.find(u=>u.idUser=== node.name)
            if (user)
                return  user.pseudo +"\n"+ user.idUser
            else
                return "----"

        },
        cssMethode(node){
            let css = node.cote ? {position:"relative",left: node.cote==='1'? "-13px":"13px"} : {}
            if (node.gagne===1)
                css.backgroundColor= "gold"
            else if (node.gagne===-1)
                css.backgroundColor= "lightcoral"
            return css
        }
    },

    created() {
        myaxios.get("/gestionTournoi").then((response) => {
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
    width: 85px;
}
</style>