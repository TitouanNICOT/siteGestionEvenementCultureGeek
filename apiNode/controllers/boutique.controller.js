import db from "../models/index.js"

const getBoutiqueByIdStand = (req, res) => {
    const id = req.params.idStand;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.produit.findAll({where: {idStand:300},include:db.type_produit})
        .then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {getBoutiqueByIdStand}