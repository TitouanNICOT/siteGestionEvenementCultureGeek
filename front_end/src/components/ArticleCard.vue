<template>
    <v-container>
        <div>
            <img class="background-article-card" src="/2000006249456.webp" alt="">
            <div class="title-article-card"><h1 class="text-title-article-card">Titre d'article</h1></div>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "ArticleCard"
}
</script>

<style scoped>
.background-article-card {
    position: relative;
    width: 300px;
    height: 175px;

    left: 17px;
    border: 1px solid #401212;
    border-radius: 10px 10px 60px 10px;
}

.title-article-card {
    position: relative;

    width: 274px;
    height: 42px;

    left: 4px;
    top: -63px;

    background: rgba(0, 0, 0, 0.75);

    border-width: 0 1px 1px 0;
    border-style: solid;
    border-color: #FFFFFF;
    border-radius: 0 0 100px 0;

    justify-content: center;
    align-items: center;
}

.text-title-article-card {
    position: relative;

    left: 24.8px;

    color: white;
}
</style>