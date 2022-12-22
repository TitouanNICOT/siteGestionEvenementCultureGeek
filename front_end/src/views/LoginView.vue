<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form  @submit.prevent="login">
      <label for="username">Nom d'utilisateur :</label>
      <br>
      <input type="text" v-model="username" id="username" name="username">
      <br>
      <label for="password">Mot de passe :</label><br>
      <input type="password" v-model="password" id="password" name="password">
      <br><br>
      <input type="submit" value="Se connecter">
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import {mapGetters, mapMutations, mapState} from "vuex";

export default {
    name: "LoginView",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Envoyez une requête HTTP POST à votre API de connexion en utilisant les données du formulaire
        axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        })
            .then(response => {
              // Traitez la réponse de l'API, par exemple en enregistrant le jeton d'accès de l'utilisateur
              console.log(response.data);

                // Récupérez le jeton d'accès de la réponse de l'API
              // const accessToken = response.data.access_token;
                // Enregistrez le jeton d'accès de l'utilisateur (par exemple dans un cookie ou un stockage local)
              // this.setAccessToken(accessToken);
                // Redirigez l'utilisateur vers une autre page de votre application
              // this.$router.push('/dashboard');
            })
            .catch(error => {
              // Affichez une erreur si la connexion a échoué
              console.error(error);
            });
      }
      // ,
      // setAccessToken(accessToken) {
      //   // Enregistrez le jeton d'accès de l'utilisateur (implémentation spécifique au navigateur et à votre application)
      //   document.cookie = 'access_token=' + accessToken;
      // }
    }
}

</script>

<style scoped>

.login-container {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input[type="text"], input[type="password"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

input[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

</style>