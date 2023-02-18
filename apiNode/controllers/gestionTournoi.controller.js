import db from "../models/index.js";


const listById = async (req, res) => {
    const id = req.params.id;
    db.inscriptionTournoi.findAll({where: {idTournoi:id}}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const add = async (req, res) => {
    console.log(req.body)
    db.inscriptionTournoi.create({
        idUser: req.body.idUser,
        idTournoi: req.body.idTournoi,
    }).then((result) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteUser = async(req, res) => {
    const idUser = req.params.idUser;
    const idTournoi = req.params.idTournoi;
    if (isNaN(idUser) || isNaN(idTournoi))
        return res.status(404).send({success: 0})
    db.inscriptionTournoi.destroy({
        where: {idUser: idUser,idTournoi:idTournoi}
    }).then((result) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}


const genereArbreNiveau = (nTour, data,idTourApres) => {  //v2
    return data.filter(tour => tour.idTourApres === idTourApres).map(tour => {
        tour.name=tour.idJoueur?tour.idJoueur:' -';
        if (nTour > 0) {
            tour.children = genereArbreNiveau(nTour - 1, data, tour.idTour)
            if (tour.idJoueur && tour.children.map(child => child.idJoueur).includes(tour.idJoueur)) {//couleur
                tour.children.forEach(child => child.gagne = -1)
                tour.children.find(child => child.idJoueur === tour.idJoueur).gagne = 1
            }
            if (nTour===1){ //decalage case pour les feuilles (pour obtimiser au max l'espace)
                tour.children[0].cote="1"
                tour.children[1].cote="2"
            }
        }
        return tour
    })
}

const genereArbre = async (req,res) => {
    const idTournoi = req.params.idTournoi
    const tournoi = await db.tournoi.findOne({where: {idTournoi: idTournoi}})
    db.tour.findAll({
        where: {idTournoi: idTournoi},//req.params.idTournoi
        raw: true
    }).then(data => {
        if (data.length === 0)
            return res.status(404).send({success: 0, data: "Aucun tournoi trouvé"})
        const arbre = genereArbreNiveau(tournoi.nbTour, data,null)[0]
        res.status(200).send({success:1,data:arbre})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des tours."
        });
        console.error(err)
    })
}

const generationTournoiNiveau = async (nTour, idTournoi, idTourApres,premierTour) => {
    for (let i = 0; i < 2; i++) {
        const {idTour} = await db.tour.create({idTournoi: idTournoi, idTourApres: idTourApres})
        if (nTour > 0)
            await generationTournoiNiveau(nTour - 1, idTournoi, idTour,premierTour)
        else
            premierTour.push(idTour)
    }
}

const generationTournoi = async (req, res) => {
    const idTournoi = req.params.idTournoi
    const tournoi = await db.tournoi.findOne({where: {idTournoi: idTournoi}})
    const nbTour = tournoi.nbTour // 3=> 8personnes
    let premierTour = []

    const inscription = await db.inscriptionTournoi.findAll({where: {idTournoi: idTournoi}, raw: true})
    if (inscription.length !== 2 ** nbTour)
        return res.status(500).send({success: 0, data: "Le nombre d'inscrits ne correspond pas au nombre de places du tournoi"})

    await db.tour.destroy({where: {idTournoi: idTournoi}})

    const {idTour} = await db.tour.create({idTournoi: idTournoi})
    await generationTournoiNiveau(nbTour-1, idTournoi, idTour,premierTour)

    for (let i = 0; i < premierTour.length; i++) {
        await db.tour.update({idJoueur: inscription[i].idUser}, {where: {idTour: premierTour[i]}})
    }
    return res.status(200).send({success: 1})
}

const majTourTounois = (req,res) => {
  const idTour = req.params.idTour
    const idJoueur = req.query.idJoueur
    db.tour.update({idJoueur: idJoueur}, {where: {idTour: idTour}}).then(async data => {
        res.status(200).send({success: 1})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des tours."
        });
        console.error(err)
    })
}

export {listById,add,deleteUser, genereArbre,generationTournoi,majTourTounois}