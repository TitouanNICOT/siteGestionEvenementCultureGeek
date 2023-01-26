<template>
    <div>
        <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
            <h1 style="text-align: center">{{nomPage}}</h1>
        </div>
        <v-row>
            <v-col v-for="(filtre,index) in filtreInfo" :key="index" :cols="12/(filtreInfo.length+1)">
                <v-text-field v-if="filtre.type==='text'" :label="filtre.label" v-model="saisie[index]"
                               style="margin-right: 10px" outlined/>
                <v-text-field v-else-if="filtre.type==='number'" :label="filtre.label" v-model="saisie[index]" type="number"
                               style="margin-right: 10px" outlined/>
                <v-select v-else-if="filtre.type==='select'" :label="filtre.label" :items="filtre.items" v-model="saisie[index]"
                          style="margin-right: 10px;" outlined/>
            </v-col>

            <v-col>
                <v-btn v-if="showBoutonDelete" style="margin-top: 10px" sm="4" color="red" @click="resetFilters" :cols="12/(filtreInfo.length+1)">
                    <v-icon>mdi-delete</v-icon>
                    Réinitialiser
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="mx-5">
            <v-col v-for="(elem,index) in datafiltre" :key="index" cols="3">
                <slot :elem="elem"></slot>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "ListeDataView",
    props:{
        nomPage:String,
        filtreInfo: Array,//info a mettre pour chaques filtres : type, label,attribut, [items]
        data :Array
    },
    data: () => {
        return {
            saisie : []
        }
    },
    computed: {
        datafiltre() {
            return this.data.filter(elem => this.verifFiltre(elem))
        },
        showBoutonDelete() {
            for (const elem of this.saisie)
                if (elem!=="") return true;
            return false
        },
    },
    methods: {
        verifFiltre(elem) {
            for (const filtre of this.filtreInfo) {
                const index = this.filtreInfo.indexOf(filtre);
                const valeur = typeof elem[filtre.attribut] === "function" ? elem[filtre.attribut]() : elem[filtre.attribut];
                const valSaisie = this.saisie[index];

                if (filtre.type==="number"){
                    if (valeur!==valSaisie && valSaisie!=="")
                        return false;
                }else if (! valeur.toLowerCase().includes(valSaisie.toLowerCase()))
                    return false;
            }
            return true
        },
        resetFilters() {
            this.saisie = []
            this.filtreInfo.forEach(() => {
                this.saisie.push("")
            })
        }
    },
    created() {
        this.resetFilters()
    }
}
</script>

<style scoped>

</style>