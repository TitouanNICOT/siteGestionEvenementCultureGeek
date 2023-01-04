import db from "../models/index.js"

const list = async (req, res) => {
    db.reserverProduit.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getReservationProduitById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.sequelize.query('SELECT * from "reserverProduits" where concat("idUser","idProduit")=?',
        { replacements: [id] }
    ).then((results) => {
        return res.status(200).send({success: 1, data: results[0]})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getReservationProduitByUser = async (req, res) => {
    const idUser = req.params.idUser;
    if (isNaN(idUser))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.reserverProduit.findAll({where: {idUser: idUser}}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getReservationProduitByProduit = async (req, res) => {
    const idProduit = req.params.idProduit;
    if (isNaN(idProduit))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.reserverProduit.findAll({where: {idProduit: idProduit}}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newReservationProduit = async (req, res) => {
    console.log(req.body)
    db.reserverProduit.create({
        quantite: req.body.quantite,
        idUser: req.body.idUser,
        idProduit: req.body.idProduit
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const modifReservationProduit = async (req, res) => {
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success: 0})

    const quantite = req.body.quantite;
    const idUser = req.body.idUser;
    const idProduit = req.body.idProduit;
    console.log(req.body)
    db.sequelize.query('update "reserverProduits" ' +
        'set quantite = ?, "idUser" = ?, "idProduit" = ? ' +
        'where concat("idUser","idProduit") = ( ' +
        'select concat("idUser","idProduit") from "reserverProduits" ' +
        'where concat("idUser","idProduit")=?);',
        { replacements: [quantite, idUser, idProduit, id] }
    ).then(()=>{
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteReservationProduit = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0})

    db.sequelize.query('DELETE from "reserverProduits" where concat("idUser", "idProduit") = ( ' +
        'SELECT concat("idUser", "idProduit") from "reserverProduits" ' +
        'where concat("idUser", "idProduit") = ?);',
        {replacements: [id]})
    .then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

export default {list,
    newReservationProduit,
    getReservationProduitById,
    modifReservationProduit,
    deleteReservationProduit,
    getReservationProduitByUser,
    getReservationProduitByProduit
};