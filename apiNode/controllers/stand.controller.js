import db from "../models/index.js";

const listStand = (req, res) => {
    db.stand.findAll({include: [db.user, db.type_stand]}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newStand = async (req, res) => {
    console.log(req.body)
    db.stand.create({
        idStand: req.body.id,
        descriptionStand: req.body.description,
        nomStand: req.body.nomStand,
        idPrestataire: req.body.prestataire,
        idTypeStand: req.body.typeStand,
        nbPlace: req.body.nbPlace ? req.body.nbPlace : 0
    }).then((/*result*/) => {
        db.stand.findByPk(req.body.id, {include: [db.user, db.type_stand]}).then((result) => {
            return res.status(200).send({success: 1, data: result})
        }).catch((error) => {
            return res.status(404).send({success: 0, data: error})
        })
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}
const getStand = async (req, res) => {
    db.stand.findByPk(req.params.id, {include: [db.user, db.type_stand]})
        .then((result) => {
            return res.status(200).send({success: 1, data: result})
        }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const updateStand = async (req, res) => {
    const id = req.params.id

    await db.stand.findByPk(id).then((result) => {
        if (result === null) {
            return res.status(404).send({success: 0, message: "Stand inexistant"})
        }
    });

    console.log(req.body)
    db.stand.update({
        nomStand: req.body.nomStand,
        descriptionStand: req.body.descriptionStand,
        idTypeStand: req.body.idTypeStand,
        nbPlace: req.body.nbPlace
    }, {
        where: {idStand: id}
    }).then((result) => {
        console.log(result)
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const listeTypeStand = async (req, res) => {
    db.type_stand.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newCommentaire = async (req, res) => {
    db.livreOr.create({
        idStand: req.params.id,
        commentaire: req.body.commentaire,
    }).then((/*result*/) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const deleteCommentaire = (req, res) => {
    db.livreOr.destroy({
        where: {idLivreOr: req.params.id}
    }).then((/*result*/) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const deleteStand = async (req, res) => {
    console.log(req.body)
    db.stand.destroy({
        where: {idStand: req.params.id}
    }).then((/*result*/) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const getStandWithEvents = async (req, res) => {
    db.stand.findAll({
        attributes: ['nomStand'],
        include: [{
            model: db.evenement,
            attributes: ['libelleEvenement', 'heureDebut', 'heureFin']
        }]
    }).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getCommentaire = (req, res) => {
    db.livreOr.findAll({
        where: {idStand: req.params.id},
    }).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {
    listStand, newStand, getStand,
    listeTypeStand, newCommentaire, deleteStand,
    deleteCommentaire, getStandWithEvents, getCommentaire,
    updateStand
}
