<template>
  <v-dialog v-model="showModifier" width="700">
    <template v-slot:activator="{on, attrs}">
      <v-btn v-on="on" v-bind="attrs" color="blue">Modifier</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 style="margin: auto">Modifier ses informations</h1>
      </v-card-title>
      <v-card-text>
        <div style="border: black 1px solid">
              <v-text-field label="Nom : " v-model="nom"   required class="mx-3"/>
              <v-text-field label="Prenom : " v-model="prenom"  required class="mx-3"/>
              <v-text-field label="Email : " v-model="email"   required class="mx-3"/>
              <v-text-field label="Mot de passe : " v-model="password1"   required class="mx-3"/>
              <v-text-field label="Répétez Mot de passe : " v-model="password2"   required class="mx-3"/>
              <v-checkbox label="Notifications" v-model="isNotif"  required class="mx-3"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="modifier" color="green">Valider</v-btn>
        <v-btn @click="showModifier=false">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import myaxios from "@/services/axios";
import {mapMutations, mapState} from "vuex";
import bcrypt from "bcryptjs";

export default {
  name: "ModifierUser",
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      isNotif: false,
      password1:"",
      password2:"",
      showModifier: false
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  methods: {
    ...mapMutations(['setCurrentUser']),

    async modifier() {
      if (this.nom === "" || this.prenom === "" || this.email === "") {
        alert("Informations manquantes")
        return;
      }

      console.log(this.isNotif)

      let password = this.currentUser.password;

      if(this.password1 !== "" && this.password1 === this.password2){
        bcrypt.hash(this.password1, 10, function (err, hash) {
          if (err) {
            alert("Erreur mot de passe")
          } else {
            password = hash;
          }
        })
      }

      try {
        const response = await myaxios.patch(`/users/${this.currentUser.idUser}`, {
          id: this.currentUser.idUser,
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          isNotif: this.isNotif,
          password: password
        });
        console.log(response);
        alert('Votre modification a bien été enregistrée');
        this.showModifier = false;
        let data = response.data.data;
        this.setCurrentUser(data);
        this.$cookies.set("currentUser", data, "1h");
        this.$emit("refresh");
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de la modification');
      }
    }
  },
  watch: {
    async showModifier(newVal){
      if (newVal){
        this.nom = this.currentUser.nom;
        this.prenom = this.currentUser.prenom;
        this.email = this.currentUser.email;
        this.isNotif = this.currentUser.isNotif;
        this.password1 = "";
        this.password2 = "";
      }
    }
  }
};
</script>


<style scoped>


.form label {
  display: block;
  margin-bottom: 10px;
}

.form label[for="quantite"] {
  font-weight: bold;
  margin: 15px;
}

.form button {
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  margin: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form button:hover {
  background-color: #3e8e41;
}

</style>