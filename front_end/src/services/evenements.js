import axios from "axios";

class Evenement {
    constructor(idEvenement, libelleEvenement, heureDebut, heureFin,idStand,typeEvenement,reservations,stand) {
        this.idEvenement = idEvenement;
        this.libelleEvenement = libelleEvenement;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.idStand = idStand;
        this.typeEvenement = typeEvenement;
        this.reservations = reservations;
        this.stand = stand;
    }

    static fromAPI(data) {
        return new Evenement(data.idEvenement,
            data.libelleEvenement,
            data.heureDebut,
            data.heureFin,
            data.idStand,
            data.type_evenement,
            data.users,
            data.stand
        )
    }

    getNombreReservation(){
        return this.reservations.length;
    }

    getLibelleTypeEvenement(){
        return this.typeEvenement.libelleTypeEvenement;
    }

    getNomStand(){
        return this.stand.nomStand;
    }
    getTypeStand(){
        return this.stand.typeStand;
    }

    //
    // setStand(stand){
    //     this.stand = stand;
    // }

    // toAPI() {
    //     return {
    //         idStand: this.id,
    //         nomStand: this.nomStand,
    //         descriptionStand: this.descriptionStand,
    //         idTypeStand: this.typeStand.idTypeStand,
    //         idUser: this.user.idUser,
    //         idEvenement: this.idEvenement
    //     }
    // }

}

    const getEvenement = (idEvenement) => {
    return axios.get("http://localhost:3000/evenements/" + idEvenement)
}

const getAllEvenement = () => {
    return axios.get("http://localhost:3000/evenements/")
}

const deleteEvenement = (idEvenement) => {
    return axios.delete("http://localhost:3000/evenements/" + idEvenement)
}

export {Evenement,getEvenement, deleteEvenement, getAllEvenement}