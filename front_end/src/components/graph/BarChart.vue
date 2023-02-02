<template>
    <div :style="chaineTaille">
        <Bar v-if="labels.length>0"
            :data="chartData"
            :options="{responsive: true}"
             style="border: grey solid 1px"
        />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
    name: 'BarChart',
    components: {
        Bar
    },
    props: {
        // chartId: String,
        color: Array,
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
        chartData(){
            return {
                labels: this.labels,
                datasets: this.donnee
                //plusieurs ensemble dans datasets permettent de comparer des listes de bar avec des couleur differentes (ex : homme/femme)
            }
        }
    }
}
</script>

<style scoped>

</style>