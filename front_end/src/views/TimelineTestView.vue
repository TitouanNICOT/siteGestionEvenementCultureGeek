<template>
    <v-container style="max-width: 1650px">
        <v-row>
            <v-col cols="12">
                <h1>Timeline</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <TimelineElement/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TimelineElement from "@/components/TimelineElement.vue";

export default {
    name: "TimelineTestView",
    components: {TimelineElement}
}
</script>

<style scoped>

</style>