<template>
    <div :style="chaineTaille">
        <Pie
            :data="chartData"
            :options="{responsive: true}"
            style="border: grey solid 1px"
        />
    </div>
</template>

<script>
import { Pie } from 'vue-chartjs'

export default {
    name: 'PieChart',
    components: {
        Pie
    },
    props: {
        // chartId: String,
        // datasetIdKey: String,
        color: Array,
        donnee: Array,
        label: Array,
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
                labels: this.label,//['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: this.color,//['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                        data: this.donnee//[40, 20, 80, 10]
                    }
                    //un autre ensemble permetrait de comparer de faire des diagrammes/ronds imbriques
                ]
            }
        }
    }
}
</script>
