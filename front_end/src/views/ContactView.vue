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

.background-logo {
    position: absolute;
    width: 1100px;
    height: 393px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(../../public/dg1w1v1l19j0_SLI_m.jpg);
}

.logo {
    width: 620px;
    height: 100%;
    z-index: 1;
    margin-top: 50px;
    margin-bottom: 125px;
}

.d-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top: 50px;
}

.Date {
    position: absolute;
    color: white;
    top: 315px;
    font-size: 36px;
    z-index: 1;
}

</style>