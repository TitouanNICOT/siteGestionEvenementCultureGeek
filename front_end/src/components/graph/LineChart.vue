<template>
    <div :style="chaineTaille">
        <LineChartGenerator
            :data="chartData"
            :options="{responsive: true}"
        />
    </div>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs'

export default {
    name: "LineChart",
    components: {
        LineChartGenerator
    },
    props: {
        // chartId: String,
        datasetIdKey: String,
        donnee: Array, // tableau de struc {label: "", data: [], backgroundColor:"}
        labels: Array,
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        }
    },
    computed: {
        chaineTaille(){
            return "width: "+this.width+"; height: "+this.height;
        },
        chartData() {
            return {
                labels: this.labels,
                datasets: this.donnee
                //plusieurs ensemble dans datasets permettent de faire plusieurs lignes
            }
        }
    },
}
</script>

<style scoped>

</style>