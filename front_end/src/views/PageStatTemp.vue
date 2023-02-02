<template>
    <div>
        <h1> Page de stat</h1>
        <v-row>
            <v-col cols="6">
                <PieChart :donnee="dataPie.data" :color="['#000000','#222222','#444444','#666666']" :label="dataPie.label"/>
            </v-col>
            <v-col cols="6">
                <BarChart :donnee="[{data:dataPie.data,label:'aaa',backgroundColor:'#555555' }]" :labels="dataPie.label" height="auto"/>
                <LineChart :donnee="[{data:dataPie.data,label:'aaa',backgroundColor:'#555555' }]" :labels="dataPie.label"/>
            </v-col>
        </v-row>
        <p>Fin</p>
    </div>
</template>

<script>
import {mapState} from "vuex";
import PieChart from "@/components/graph/PieChart";
import BarChart from "@/components/graph/BarChart";

import {Chart as ChartJS, registerables} from 'chart.js'
import LineChart from "@/components/graph/LineChart";
ChartJS.register(...registerables)

export default {
    name: "PageStatTemp",
    components: {LineChart, PieChart,BarChart},
    computed: {
        ...mapState(['stands','listeTypeStand']),
        dataPie(){
            let data = [];
            let label = []
            this.listeTypeStand.forEach(typeStand => {
                data.push(this.stands.filter(stand => stand.typeStand.idTypeStand === typeStand.idTypeStand).length);
                label.push(typeStand.libelleTypeStand);
            });
            return {data,label};
        }
    }
}
</script>

<style scoped>

</style>