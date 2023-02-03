<template>
    <v-container style="max-width: 1650px">
        <v-row class="justify-center">
            <v-col cols="8">
                <v-row class="justify-center">
                    <img class="logo" src="/GEEKY_EVENT.png" alt=""/>
                </v-row>
                <form-contact/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import formContact from "@/components/formContact";

export default {
    name: "ContactView",
    components: {
        formContact
    }
}
</script>

<style scoped>

.logo {
    width: 620px;
    height: 100%;
    z-index: 1;
    margin-top: 50px;
    margin-bottom: 125px;
}

</style>
