<template>
    <div>
        <ListeDataView :data="stands" :filtreInfo="filtreInfo" nomPage="Liste stand">
            <template v-slot:default="{elem}">
                <v-card class="pa-3" style="height: 100%" outlined @click="goToStand(elem.id)">
                    <h3 style="text-align: center;">{{ elem.nomStand }}</h3>
                    <hr>
                    <span>Numéro du stand : <strong>{{ elem.id }}</strong></span>
                    <br>
                    <span>Type de stand : <strong>{{ elem.libelleTypeStand() }}</strong></span>
                    <br>
                    <span>Nom Prestataire : <strong>{{ elem.libellePresta() }}</strong></span>
                    <br>
                    <span>Pseudo Prestataire : <strong>{{ elem.user.pseudo }}</strong></span>
                    <br>
                    <span>Role Prestataire : <strong>{{ elem.user.idRole }}</strong></span>
                    <br>
                    <span>Description : <strong>{{ elem.descriptionStand }}</strong></span>
                </v-card>
            </template>
        </ListeDataView>
    </div>
</template>

<script>
import ListeDataView from "@/components/ListeDataView";
import {mapState} from "vuex";

export default {
    name: "TestListDataView",
    components: {ListeDataView},
    data: ()=>{
        return {
            filtreInfo: [{type: "text", label: "Nom",attribut: "nomStand"},
                {type: "text", label: "Description",attribut: "descriptionStand"},
                {type: "select", label: "Type de stand",attribut: "libelleTypeStand",
                    items: ["boutique", "tournois", "tournois", "temporaire"]},
                {type:"text",label:"Prestataire",attribut:"libellePresta"}]
        }
    },
    computed:{
        ...mapState(["stands"]),
    },
    methods: {
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        }
    }
}
</script>