import {genereArbre} from "../../controllers/gestionTournoi.controller.js";

export default async (db) => {
    for (let i = 0; i < 8; i++) {
        await db.user.create({
            nom: 'joueur' + i,
            prenom: 'tournoiTest' + i,
            pseudo: 'joueurTT' + i,
            password: 'impossible de se connecter avec',
            email: 'joueurTT' + i + '@qerf.vv',
            isNotif: true,
            idRole: 3
        })
    }

    await db.tournoi.create({
        nomTournoi: 'TournoiTest',
        nbTour: 3
    })

    const dataTour=[
        {idJoueur1: 7, idJoueur2: 8, idTournoi: 1, nTour: 1,idTourApres:5,gagnant:7},
        {idJoueur1: 9, idJoueur2: 10, idTournoi: 1, nTour: 1,idTourApres:5,gagnant: 9},
        {idJoueur1: 11, idJoueur2: 12, idTournoi: 1, nTour: 1,idTourApres:6},
        {idJoueur1: 13, idJoueur2: 14, idTournoi: 1, nTour: 1,idTourApres:6},
        {idJoueur1:8, idJoueur2:9, idTournoi:1, nTour:2,idTourApres:7,gagnant:9},
        {idJoueur1:11, idJoueur2:13, idTournoi:1, nTour:2,idTourApres:7},
        {idJoueur1:9, idJoueur2:11, idTournoi:1, nTour:3}
    ]
    // const dataTour = [
    //     {idJoueur: 7, idTournoi: 1, nTour: 1, idTourApres:9},
    //     {idJoueur: 8, idTournoi: 1, nTour: 1, idTourApres:9},
    //     {idJoueur: 9, idTournoi: 1, nTour: 1, idTourApres:10},
    //     {idJoueur: 10, idTournoi: 1, nTour: 1, idTourApres:10},
    //     {idJoueur: 11, idTournoi: 1, nTour: 1, idTourApres:11},
    //     {idJoueur: 12, idTournoi: 1, nTour: 1, idTourApres:11},
    //     {idJoueur: 13, idTournoi: 1, nTour: 1, idTourApres:12},
    //     {idJoueur: 14, idTournoi: 1, nTour: 1, idTourApres:12},
    //     {idJoueur: 8, idTournoi: 1, nTour: 2, idTourApres:13},
    //     {idJoueur: 9, idTournoi: 1, nTour: 2, idTourApres:13},
    //     { idTournoi: 1, nTour: 2, idTourApres:14},
    //     { idTournoi: 1, nTour: 2, idTourApres:14},
    //     { idTournoi: 1, nTour: 3, idTourApres:15},
    //     { idTournoi: 1, nTour: 3, idTourApres:15},
    //     { idTournoi: 1, nTour: 4}
    // ]
    await db.tour.bulkCreate(dataTour)


}