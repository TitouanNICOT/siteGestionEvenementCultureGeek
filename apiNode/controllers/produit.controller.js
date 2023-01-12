import db from "../models/index.js"

const list = async (req, res) => {
    db.produit.findAll({include: db.type_produit}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getProduitById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.produit.findByPk(id,{include:db.type_produit}).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newProduit = async (req, res) => {
    console.log(req.body)
    db.produit.create({
        libelleProduit: req.body.libelleProduit,
        descriptionProduit: req.body.descriptionProduit,
        prix: req.body.prix,
        imageProduit: req.body.imageProduit,
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const modifProduit = async (req, res) => {
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success: 0})

    console.log(req.body)
    db.produit.update({
        libelleProduit: req.body.libelleProduit,
        descriptionProduit: req.body.descriptionProduit,
        prix: req.body.prix,
        imageProduit: req.body.imageProduit,
    }, {
        where: {idProduit: id}
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteProduit = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0})
    db.produit.destroy({
        where: {idProduit: id}
    }).then(() => {
        return res.status(200).send({success: 1})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const listTypeProduit = async (req, res) => {
    db.type_produit.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {list, newProduit, getProduitById, modifProduit, deleteProduit, listTypeProduit};