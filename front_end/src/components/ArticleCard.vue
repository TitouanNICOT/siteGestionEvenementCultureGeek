<template>
    <v-container>
        <div class="article-card">
            <div class="topper-title-article-card"></div>
            <img v-if="image" class="background-article-card" :src="image" :alt="image" @click="goArticle">
            <img v-else class="background-article-card" src="/2000006249456.webp" alt="default.webp" @click="goArticle">
            <div class="title-article-card" @click="goArticle"><h3 class="text-title-article-card">{{ titre }}</h3></div>

        </div>
    </v-container>
</template>

<script>
export default {
    name: "ArticleCard",
    props:{
        titre: String,
        lien: String,
        image: String
    },
    methods: {
        goArticle() {
            this.$router.push({name: "evenementById", params: {id: this.lien}})
        }
    }
}
</script>

<style scoped>
.background-article-card {
    position: relative;
    width: 300px;
    height: 175px;
    z-index: 1;
    left: 17px;
    border: 1px solid #401212;
    border-radius: 10px 10px 60px 10px;

    transition-property: border-radius;
    transition-duration: 0.4s;
}

.title-article-card {
    position: relative;

    width: 274px;
    height: 42px;
    z-index: 2;
    left: 4px;
    top: -63px;

    background: rgba(0, 0, 0, 0.75);

    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #FFFFFF;
    border-radius: 0 0 100px 0;

    justify-content: center;
    align-items: center;

    transition-property: left, top, background;
    transition-duration: 0.5s;
}


.topper-title-article-card {
    position: relative;
    z-index: 0;
    width: 0;
    height: 0;

    left: 4px;
    top: 118px;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 10px solid rgba(0, 0, 0, 0.65);

    transition-property: left, top, background;
    transition-duration: 0.5s;
}

.text-title-article-card {
    position: relative;
    top: 5px;
    left: 25px;

    color: white;
}

</style>
