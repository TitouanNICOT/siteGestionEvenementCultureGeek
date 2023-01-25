import axios from "axios";

const couleurStand = {
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow",
}

class Stand {
    constructor(idStand, nomStand, descriptionStand, typeStand, user,nbPlace) {
        this.id = idStand;// type = Int
        this.nomStand = nomStand;
        this.descriptionStand = descriptionStand;
        this.typeStand = typeStand;
        this.user = user;
        this.listEvenement = [];
        this.nbPlace=nbPlace;
    }

    static fromAPI(data) {
        return new Stand(data.idStand,
            data.nomStand,
            data.descriptionStand,
            data.type_stand,
            data.user,
            data.nbPlace
        )
    }

    toAPI() {
        return {
            idStand: this.id,
            nomStand: this.nomStand,
            descriptionStand: this.descriptionStand,
            idTypeStand: this.typeStand.idTypeStand,
            idUser: this.user.idUser
        }
    }

    libellePresta() {
        return this.user === undefined ? "null" : this.user.nom + " " + this.user.prenom
    }

    idPresta() {
        return this.user.idUser
    }

    libelleTypeStand() {
        return this.typeStand === undefined ? "null" : this.typeStand.libelleTypeStand
    }

    getCouleur() {
        return couleurStand[this.typeStand.idTypeStand]
    }

}

const addCommentaire = (idStand, texte) => {
    return axios.post("http://localhost:3000/stands/" + idStand + "/commentaire", {
        commentaire: texte
    })
}
const getStand = (idStand) => {
    return axios.get("http://localhost:3000/stands/" + idStand)
}

const getAllStand = () => {
    return axios.get("http://localhost:3000/stands/")
}

const deleteStand = (idStand) => {
    return axios.delete("http://localhost:3000/stands/" + idStand)
}

export {Stand, addCommentaire, getStand, deleteStand, getAllStand}