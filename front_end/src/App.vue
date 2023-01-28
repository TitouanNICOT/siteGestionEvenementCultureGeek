<template>
    <v-app>
        <NavBar :drawer="drawer"></NavBar>
        <v-app-bar app
                   hide-on-scroll
        >
            <v-app-bar-nav-icon v-if="drawer === false" @click="drawer = true"></v-app-bar-nav-icon>
            <v-app-bar-nav-icon v-else @click="drawer = false"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-main>
            <router-view :drawer="drawer"/>
        </v-main>

        <v-footer color="var(--primary-color)" dark>
            <Footer></Footer>
        </v-footer>
    </v-app>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
    name: 'App',
    components: {NavBar,Footer},
    data: () => ({
        drawer: false
    }),
    methods: {
        ...mapActions(['loading']),
        ...mapMutations(['setCurrentUser']),
    },
    created() {
        this.loading()
        this.setCurrentUser(this.$cookies.get("currentUser"));
        // console.log(this.$cookies.get("currentUser"));
    }
};

</script>

<style>

* {
    --primary-color: #401212;
}

@font-face {
    font-family: 'Galyon Book';
    src:url('assets/fonts/Galyon-Book.otf') format('opentype'),
    url('assets/fonts/Galyon-Bold.otf') format('opentype'),
    url('assets/fonts/Galyon-Bold-Italic.otf') format('opentype'),
    url('assets/fonts/Galyon-Book-Italic.otf') format('opentype');
}

@font-face {
    font-family: 'Lexend';
    src: url('assets/fonts/Lexend-Regular.ttf') format('truetype'),
    url('assets/fonts/Lexend-Thin.ttf') format('truetype'),
    url('assets/fonts/Lexend-ExtraLight.ttf') format('truetype'),
    url('assets/fonts/Lexend-Light.ttf') format('truetype'),
    url('assets/fonts/Lexend-Medium.ttf') format('truetype'),
    url('assets/fonts/Lexend-SemiBold.ttf') format('truetype'),
    url('assets/fonts/Lexend-Bold.ttf') format('truetype'),
    url('assets/fonts/Lexend-ExtraBold.ttf') format('truetype'),
    url('assets/fonts/Lexend-Black.ttf') format('truetype'),
    url('assets/fonts/Lexend-VariableFont_wght.ttf') format('truetype');
}

h1 {
    font-family: Lexend, sans-serif;
    font-size: 35px;
    color: var(--primary-color);
}

h2 {
    font-family: Lexend, sans-serif;
    font-size: 25px;
    color: var(--primary-color);
}

h3 {
    font-family: Lexend, sans-serif;
    font-size: 20px;
    color: var(--primary-color);
}

p, span, div, v-container {
    font-family: Galyon Book, sans-serif;
    font-size: 16px;
    letter-spacing: 1px;
}

hr {
    border-color: var(--primary-color);
    margin-bottom: 10px;
}

</style>
