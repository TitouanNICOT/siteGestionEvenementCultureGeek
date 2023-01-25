class Evenement {
    constructor(idEvenement, libelleEvenement, heureDebut, heureFin,idStand,typeEvenement,reservations) {
        this.idEvenement = idEvenement;
        this.libelleEvenement = libelleEvenement;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.idStand = idStand;
        this.typeEvenement = typeEvenement;
        this.reservations = reservations;
        this.stand = undefined;
    }

    static fromAPI(data) {
        return new Evenement(data.idEvenement,
            data.libelleEvenement,
            data.heureDebut,
            data.heureFin,
            data.idStand,
            data.type_evenement,
            data.users
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

    setStand(stand){
        this.stand = stand;
        stand.listEvenement.push(this);
    }

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

export default Evenement