import db from "../models/index.js"

const list = async (req, res) => {
    db.evenement.findAll({include: [db.type_evenement, db.user, db.tournoi]}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getEvenementById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.evenement.findByPk(id, {include: [db.type_evenement, db.user, db.tournoi]})
        .then((results) => {
            return res.status(200).send({success: 1, data: results})
        }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newEvenement = async (req, res) => {
    console.log(req.body)
    db.evenement.create({
        libelleEvenement: req.body.libelleEvenement,
        heureDebut: req.body.heureDebut,
        heureFin: req.body.heureFin,
        idTypeEvenement: req.body.idTypeEvenement,
        idStand: req.body.idStand
    }).then((result) => {
        console.log("resultat de la création : ");
        console.log(result);
        console.log(result.idEvenement);
        return res.status(200).send({success: 1,data:result})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const modifEvenement = async (req, res) => {
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success: 0})

    console.log(req.body)
    db.evenement.update({
        libelleEvenement: req.body.libelleEvenement,
        heureDebut: req.body.heureDebut,
        heureFin: req.body.heureFin,
        idTypeEvenement: req.body.idTypeEvenement,
        idStand: req.body.idStand
    }, {
        where: {idEvenement: id}
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteEvenement = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0})
    db.evenement.destroy({
        where: {idEvenement: id}
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const listTypeEvenement = async (req, res) => {
    db.type_evenement.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const addUserInEvent = async (req, res) => {
    db.reservation.create({
        idEvenement: req.params.id,
        idUser: req.body.idUser
    }).then(() => {
        console.log("ok")
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const removeUserInEvent = async (req, res) => {
    db.reservation.destroy({
        where: {
            idEvenement: req.params.id,
            idUser: req.body.idUser
        }
    }).then(() => {
        console.log("ok")
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    })
}

const getReservationByEvenement = (req, res) => {
    db.reservation.findAll({where: {idEvenement: req.params.id}})
        .then((results) => {
            return res.status(200).send({success: 1, data: results})
        }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const removeAllUsersInEvent = (req, res) => {
    db.reservation.destroy({
        where: {idEvenement: req.params.id}
    }).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const listReservation = (req, res) => {
    db.reservation.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {
    list, newEvenement, getEvenementById, modifEvenement, deleteEvenement, listTypeEvenement,
    addUserInEvent, removeUserInEvent, getReservationByEvenement, listReservation, removeAllUsersInEvent: removeAllUsersInEvent
};
