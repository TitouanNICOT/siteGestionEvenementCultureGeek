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

    const dataTout=[
        {idJoueur1: 7, idJoueur2: 8, idTournoi: 1, nTour: 1,idTourApres:5},
        {idJoueur1: 9, idJoueur2: 10, idTournoi: 1, nTour: 1,idTourApres:5},
        {idJoueur1: 11, idJoueur2: 12, idTournoi: 1, nTour: 1,idTourApres:6},
        {idJoueur1: 13, idJoueur2: 14, idTournoi: 1, nTour: 1,idTourApres:6},
        {idJoueur1:8, idJoueur2:9, idTournoi:1, nTour:2,idTourApres:7},
        {idJoueur1:11, idJoueur2:13, idTournoi:1, nTour:2,idTourApres:7},
        {idJoueur1:9, idJoueur2:11, idTournoi:1, nTour:3}
    ]
    await db.tour.bulkCreate(dataTout)


}