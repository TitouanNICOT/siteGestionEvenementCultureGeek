<template>
    <table class="mx-auto">
        <thead>
        <tr>
            <th v-for="(value,key,index) in data[0]" :key="index">{{ key }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(ligne,index) in data" :key="index">
            <td v-for="(value,key,index2) in ligne" :key="index2">{{ value }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'

export default {
    name: "showTable",
    data: () => {
        return {
            data: []
        }
    },
    mounted() {
        axios.get("http://localhost:3000/users")
            .then(response => {
                if (response.data.success === 1)
                    this.data = response.data.data
                console.log(this.data[0].key)
            })
    }
}
</script>

<style scoped>
th, td {
    border: black 1px solid;
    padding: 5px;
}
</style>