class Evenement {
    constructor(idEvenement, libelleEvenement, heureDebut, heureFin,idStand,typeEvenement,reservations,tournoi) {
        this.idEvenement = idEvenement;
        this.libelleEvenement = libelleEvenement;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.idStand = idStand;
        this.typeEvenement = typeEvenement;
        this.reservations = reservations;
        this.stand = undefined;
        this.tournoi = tournoi;
    }

    static fromAPI(data) {
        return new Evenement(data.idEvenement,
            data.libelleEvenement,
            data.heureDebut,
            data.heureFin,
            data.idStand,
            data.type_evenement,
            data.users,
            data.tournoi
        )
    }

    getNombreReservation(){
        return this.reservations.length;
    }

    getLibelleTypeEvenement(){
        return this.typeEvenement.libelleTypeEvenement;
    }

    getNomStand(){
        return this.stand ? this.stand.nomStand : "null";
    }
    getTypeStand(){
        return this.stand.typeStand;
    }

    setStand(stand){
        this.stand = stand;
        stand.listEvenement.push(this);
    }

    getIdPresta(){
        return this.stand ? this.stand.user.idUser : undefined;
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