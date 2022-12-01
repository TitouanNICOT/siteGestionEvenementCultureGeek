import db from "../models/index.js"

const list = (req, res) => {
    db.evenement.findAll({include:db.type_evenement},{include:db.stand}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getEvenementById = (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.evenement.findByPk(id).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newEvenement = (req, res) => {
    console.log(req.body)
    db.evenement.create({
        libelleEvenement: req.body.libelleEvenement,
        heureDebut: req.body.heureDebut,
        heureFin: req.body.heureFin,
        idTypeEvenement: req.body.idTypeEvenement,
        idStand: req.body.idStand
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const modifEvenement = (req, res) => {
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

const deleteEvenement = (req, res) => {
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

const listStand = (req,res) => {
    db.stand.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const listTypeEvenement = (req,res) => {
    db.type_evenement.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {list, newEvenement, getEvenementById, modifEvenement, deleteEvenement, listStand, listTypeEvenement};