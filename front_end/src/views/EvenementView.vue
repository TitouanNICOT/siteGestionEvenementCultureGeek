<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Evenement</h1>
    </div>
    <div v-for="(elem,index) in evenement" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined>
          <h3 style="text-align: center;">{{elem.libelle}}</h3>
          <hr>
          <span>Type d'événement : <strong>{{elem.typeEve}}</strong></span>
          <br>
          <span>Heure de Début : <strong>{{elem.heureDebut}}h</strong></span>
          <br>
          <span>Heure de Fin : <strong>{{elem.heureFin}}h</strong></span>
          <br>
          <span>Nombre de place : <strong>{{elem.nbPlace}}</strong></span>
          <br>
          <span>Numéro du stand : <strong>{{elem.numStand}}</strong></span>
          <br>
          <img v-bind:src="elem.image" style="width: 300px">
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvenementView",
  data:()=>({
    evenement:[{libelle: "Tournois Minecraft", heureFin: 22, heureDebut: 20, nbPlace: 120, numStand: 256, typeEve: "Tournoi", image: "https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png"},
        {libelle: "Norman nous explique tout", heureFin: 13, heureDebut: 9, nbPlace: 604, numStand: 103, typeEve: "Spectacle", image: "https://images.centrepresseaveyron.fr/api/v1/images/view/638dfc7546267a49f52e0994/large/image.png?v=1"}]
  }),
}
</script>

<style scoped>

</style>