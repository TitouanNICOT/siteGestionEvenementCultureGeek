<template>
    <CarteSVG @standSelected="action" :tabCouleur="tabCouleur" :modif-etat="elemActu"></CarteSVG>
</template>

<script>
import CarteSVG from "../components/CarteSVG.vue"
export default {
    name: "CarteView",
    data:()=>{
        return{
            tabCouleur:Array(),
            elemActu:{}
        }
    },
    components:{CarteSVG},
    methods:{
        action(event){
            let stand=this.tabCouleur.find(stand=>stand.id==event.id)
            if (stand===undefined) {
                this.tabCouleur.push({id: event.id.toString(), couleur: "blue"})
                this.elemActu = {id: event.id, couleur:"blue"}
            }
            else {
                stand.couleur = "green"
                this.elemActu = {id: event.id, couleur: stand.couleur}
            }
        }
    },
}
</script>

<style scoped>

</style>