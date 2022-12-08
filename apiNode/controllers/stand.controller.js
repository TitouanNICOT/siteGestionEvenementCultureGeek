import db from "../models/index.js";

const listStand = (req,res) => {
    db.stand.findAll({include:db.user}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newStand = (req,res) => {
    console.log(req.body)
    db.stand.create({
        idStand: req.body.id,
        descriptionStand: req.body.description,
        nomStand: req.body.nomStand,
        idUser: req.body.idUser
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

export default {listStand, newStand}