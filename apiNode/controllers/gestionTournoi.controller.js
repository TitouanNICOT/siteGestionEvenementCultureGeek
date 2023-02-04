import db from "../models/index.js";

// const genereArbreNiveau = (nTour, data,idTourApres) => {
//     return data.filter(tour => tour.idTourApres === idTourApres).map(tour => {
//         tour.name=tour.idJoueur?tour.idJoueur:' -';
//         if (nTour > 1) {
//             tour.children = genereArbreNiveau(nTour - 1, data,tour.idTour)
//         }
//         return tour
//     })
// }
const genereArbreNiveau = (nTour, data,idTourApres) => {
    return data.filter(tour => tour.idTourApres === idTourApres).map(tour => {
        tour.name=tour.gagnant ? tour.gagnant : ' -';
        tour.gagne=0
        if (nTour > 1) {
            tour.children = genereArbreNiveau(nTour - 1, data,tour.idTour)
        }else{
            tour.children=[
                {name:tour.idJoueur1,cote:"1"},
                {name:tour.idJoueur2,cote:"2"}
            ]
        }
        if (tour.idJoueur1===tour.gagnant) {
            tour.children[0].gagne = 1
            tour.children[1].gagne = -1
        }else if (tour.idJoueur2===tour.gagnant) {
            tour.children[1].gagne = 1
            tour.children[0].gagne = -1
        }
        return tour
    })
}

const genereArbre = async (req,res) => {
    const tournoi = await db.tournoi.findOne({where: {idTournoi: 1}})
    db.tour.findAll({
        where: {idTournoi: 1},//req.params.idTournoi
        raw: true
    }).then(data => {
        const arbre = genereArbreNiveau(tournoi.nbTour, data,null)[0]
        res.status(200).send({success:1,data:arbre})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des tours."
        });
        console.error(err)
    })
}

export {genereArbre}