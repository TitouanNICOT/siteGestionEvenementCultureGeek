<template>
    <v-container style="max-width: 1650px">
        <v-row class="justify-center">
            <v-col cols="8">
                <v-row class="justify-center">
                    <img class="logo" src="/GEEKY_EVENT.png" alt=""/>
                    <div class="background-logo"/>
                    <h1 class="Date"> Du 1er au 3 Février à BonRepas !</h1>
                </v-row>
                <div>
                    <h1>Description</h1>
                    <hr>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod turpis. In sed ante
                        arcu. Pellentesque aliquet ipsum ac augue laoreet aliquet. Duis vitae ipsum a libero maximus
                        dignissim id a ex. Suspendisse varius, massa ac commodo dignissim, justo risus blandit ipsum,
                        nec tristique ex lectus quis lacus. Morbi varius egestas ipsum et commodo. Nunc ultricies dictum
                        sem, non porta mi hendrerit a. Morbi eget sodales sapien.</p>
                    <p>Mauris eget lorem tellus. Praesent et lectus rutrum, finibus enim eu, iaculis turpis. Duis
                        dapibus rutrum auctor. Pellentesque sit amet viverra arcu. Nulla facilisi. Morbi nisi ex,
                        condimentum pharetra ex at, mollis dictum ex. Pellentesque rutrum iaculis volutpat.</p>
                    <h1>Evenements en cours et à venir</h1>
                    <hr>
                    <div class="d-grid">
                        <span v-for="(event, index) in evenements" :key="index">
                            <ArticleCard :titre="event.libelleEvenement"
                                         :lien="event.idEvenement">

                            </ArticleCard>
                        </span>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import ArticleCard from "@/components/ArticleCard";
import {mapState} from "vuex";

export default {
    name: "AccueilView",
    components: {
        ArticleCard
    },
    data() {
        return {
            listEvents: []
        }
    },
    computed: {
        ...mapState(['evenements'])
    },
    // mounted() {
    //     axios.get("/evenements/")
    //         .then(res => {
    //             this.listEvents = res.data.data
    //         })
    // }
}
</script>

<style scoped>

.background-logo {
    position: absolute;
    width: 100%;
    height: 393px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(../../public/dg1w1v1l19j0_SLI_m.jpg);
}

.Date {
    position: absolute;
    color: white;
    top: 315px;
    font-size: 36px;
    z-index: 1;
}

.logo {
    max-width: 70%;
    height: auto;
    z-index: 1;
    margin-top: 50px;
    margin-bottom: 125px;
}

@media (min-width: 600px) {
    .d-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
        margin-top: 50px;
    }
}

@media (min-width: 900px) {
    .d-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
        margin-top: 50px;
    }
}

@media (min-width: 1300px) {
    .d-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        margin-top: 50px;
    }
}
</style>
<style lang="scss"> @import "~@/assets/css/cardAnim.scss"; </style>
