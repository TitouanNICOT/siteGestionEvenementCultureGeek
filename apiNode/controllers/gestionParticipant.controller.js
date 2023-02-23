import db from "../models/index.js";

const listParticipantById = async (req, res) => {
    const id = req.params.id;
    db.inscriptionTournoi.findOne(id).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const listAllParticipant = async (req, res) => {
    db.inscriptionTournoi.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const deleteParticipant = async (req, res) => {
    const idUser = req.params.idUser;
    const idTournoi = req.params.idTournoi;
    db.inscriptionTournoi.destroy({where: {idUser: idUser, idTournoi:idTournoi}}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const addParticipant = async (req, res) => {
    console.log("BONJOUR")
    const idUser = req.body.idUser;
    const idTournoi = req.body.idTournoi;
    var listUser = await db.user.findAll()
    listUser = listUser.map((item) => {
        return item.dataValues.idUser
    })
    var listUserTournoi = await db.inscriptionTournoi.findAll()
    var listTournoi = listUserTournoi.map((item) => {
        return item.idTournoi
    })
    console.log(listTournoi)
    listUserTournoi = listUserTournoi.map((item) => {
        return item.idUser
    })
    console.log(listUser)
    if (!listUser.includes(idUser) || !listTournoi.includes(idTournoi)) {
        return res.status(404).send({success: 0, error: "User or tournoi not found"})
    }
    if (listUserTournoi.includes({idUser: idUser, idTournoi: idTournoi})) {
        return res.status(404).send({success: 0, error: "User already in tournoi"})
    }
    db.inscriptionTournoi.create({
        idUser: idUser,
        idTournoi: idTournoi,
    }).then((result) => {
        return res.status(200).send({success: 1, data: result})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export {listParticipantById, listAllParticipant, deleteParticipant, addParticipant}