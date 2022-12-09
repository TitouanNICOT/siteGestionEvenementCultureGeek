<template>
    <v-app>
<!--        <RouterView></RouterView>-->
        <v-app-bar
                app
                color="green"
                dark

        >
            <NavBar :titles="[{text: 'Home', color: 'grey'}
            , {text: 'Carte', color: 'grey'}
            , {text: 'Liste des Stands', color: 'grey'}
            , {text: 'Se Connecter', color: 'green'}]"
                    @menu-clicked="changeRoute">
            </NavBar>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

      // import {mapActions} from 'vuex'
      import router from "@/router";
      import NavBar from "@/components/NavBar";

      export default {
          name: 'App',
          components: {NavBar},
          data: () => ({
              //
          }),
          methods: {
              // ...mapActions(['']),
              // ...mapActions(['']),
              changeRoute(id) {
                  if(id == 0){
                      router.push('/')
                  }
                  else if (id == 1){
                      router.push('/carte')
                  }
                  else if (id == 2){
                      router.push('/stand')
                  }
                  else if (id == 3){
                      router.push('/login')
                  }
              }
          },
          mounted() {

          }
      };

</script>

<style>

*{
    --primary-color: #401212;
}

@font-face {
    font-family: 'Galyon Book';
    src: url('assets/fonts/Galyon-Bold.otf') format('opentype'),
    url('assets/fonts/Galyon-Bold-Italic.otf') format('opentype'),
    url('assets/fonts/Galyon-Book.otf') format('opentype'),
    url('assets/fonts/Galyon-Book-Italic.otf') format('opentype');
}

@font-face {
    font-family: 'Lexend';
    src: url('assets/fonts/Lexend-Thin.ttf') format('truetype'),
    url('assets/fonts/Lexend-ExtraLight.ttf') format('truetype'),
    url('assets/fonts/Lexend-Light.ttf') format('truetype'),
    url('assets/fonts/Lexend-Medium.ttf') format('truetype'),
    url('assets/fonts/Lexend-Regular.ttf') format('truetype'),
    url('assets/fonts/Lexend-SemiBold.ttf') format('truetype'),
    url('assets/fonts/Lexend-Bold.ttf') format('truetype'),
    url('assets/fonts/Lexend-ExtraBold.ttf') format('truetype'),
    url('assets/fonts/Lexend-Black.ttf') format('truetype'),
    url('assets/fonts/Lexend-VariableFont_wght.ttf') format('truetype');
}

h1 {
    font-family: Lexend, sans-serif;
    font-size: 24px;
    color: var(--primary-color);
}

h2 {
    font-family: Lexend, sans-serif;
    font-size: 18px;
    color: var(--primary-color);
}

p, span, div, v-container {
    font-family: Galyon Book, sans-serif;
    font-size: 14px;
}

hr{
    border-color: var(--primary-color);
    margin-bottom: 10px;
}

</style>
