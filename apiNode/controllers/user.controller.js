// const userS = require("../services/user.service")
import userS from "../services/user.service.js"

const list = (req, res) => {
    userS.getAllUser((error, results) => {
        if (error)
            return res.status(404).send({success: 0, data: error})
        return res.status(200).send({success: 1, data: results})
    })
}

const newUser = (req, res) => {
    console.log(req.body)
    const data = [
        req.body.nom,
        req.body.prenom,
        req.body.pseudo,
        req.body.password,
        req.body.email,
        true,//notifs
        req.body.role
    ]
    userS.newUser(data, (status) => {
        return res.status(200).send({success: status})
    })
}

const getUserById = (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})
    userS.getUserById(id, (error, results) => {
        if (error)
            return res.status(404).send({success: 0, data: error})
        return res.status(200).send({success: 1, data: results})
    })
}

const modifUser = (req, res) => {
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success: 0})
    const data = [
        req.body.nom,
        req.body.prenom,
        req.body.pseudo,
        req.body.password,
        req.body.email,
        true,//notifs
        req.body.role,
        id
    ]
    userS.modifUser(data, (status) => {
        return res.status(200).send({success: status})
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0})
    userS.deleteUser(id, (status) => {
        return res.status(200).send({success: status})
    })
}

export default {list, newUser, getUserById, modifUser, deleteUser};