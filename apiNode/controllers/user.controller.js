import db from "../models/index.js"

const list = (req, res) => {
    db.user.findAll({include:db.role}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getUserById = (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.user.findByPk(id).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newUser = (req, res) => {
    console.log(req.body)
    db.user.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        password: req.body.password,
        email: req.body.email,
        isNotif: true,
        idRole: req.body.role
    }).then((result) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const modifUser = (req, res) => {
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success: 0})

    console.log(req.body)
    db.user.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        password: req.body.password,
        email: req.body.email,
        isNotif: req.body.isNotif,
        idRole: req.body.role
    }, {
        where: {idUser: id}
    }).then((result) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0})
    db.user.destroy({
        where: {idUser: id}
    }).then((result) => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const listRole = (req,res) => {
   db.role.findAll().then((results) => {
       return res.status(200).send({success: 1, data: results})
   }).catch((error) => {
         return res.status(404).send({success: 0, data: error})
   })
}

export default {list, newUser, getUserById, modifUser, deleteUser, listRole};