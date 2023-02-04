import db from "../models/index.js";

const genereArbreNiveau = (nTour, data,idTourApres) => {
    return data.filter(tour => tour.idTourApres === idTourApres).map(tour => {
        // const res = tour
        if (nTour > 1) {
            tour.children = genereArbreNiveau(nTour - 1, data,tour.idTour)
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
        const arbre = genereArbreNiveau(tournoi.nbTour, data,null)
        res.status(200).send(arbre)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des tours."
        });
        console.error(err)
    })
}

export {genereArbre}