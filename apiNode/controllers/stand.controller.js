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
        idUser: req.body.idUser,
        idTypeStand: req.body.typeStand
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}
const getStand = (req,res) =>{
    db.stand.findByPk(req.params.id,{include:[db.user,db.type_stand,"livreOr"]})
        .then((result) => {
            return res.status(200).send({success: 1, data: result})
        }).catch((error) => {
            return res.status(404).send({success: 0, data: error})
        })
}

export default {listStand, newStand,getStand }