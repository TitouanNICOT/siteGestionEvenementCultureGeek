import axios from "axios";

class Stand{
    constructor(idStand, nomStand, descriptionStand, typeStand, user, idEvenement) {
        this.id = idStand;
        this.nomStand = nomStand;
        this.descriptionStand = descriptionStand;
        this.typeStand = typeStand;
        this.user = user;
        this.idEvenement = idEvenement;
        this.couleur= "red";
    }

    static fromAPI(data){
        return new Stand(data.idStand.toString(),
            data.nomStand,
            data.descriptionStand,
            data.type_stand,
            data.user,
            data.idEvenement)
    }
    toAPI(){
        return {
            idStand:this.id,
            nomStand: this.nomStand,
            descriptionStand: this.descriptionStand,
            idTypeStand: this.typeStand.idTypeStand,
            idUser: this.user.idUser,
            idEvenement: this.idEvenement
        }
    }
    libellePresta(){
        return this.user===undefined ? "null" : this.user.nom+" "+this.user.prenom
    }

    libelleTypeStand(){
        return this.typeStand===undefined ? "null" : this.typeStand.libelleTypeStand
    }

}

const addCommentaire = (idStand,texte) => {
    return axios.post("http://localhost:3000/stands/"+idStand+"/commentaire",{
        commentaire:texte
    })
}
const getStand = (idStand) => {
    return axios.get("http://localhost:3000/stands/"+idStand)
}

const getAllStand = () => {
    return axios.get("http://localhost:3000/stands/")
}

const deleteStand = (idStand) => {
    return axios.delete("http://localhost:3000/stands/"+idStand)
}

export {Stand,addCommentaire,getStand,deleteStand,getAllStand}