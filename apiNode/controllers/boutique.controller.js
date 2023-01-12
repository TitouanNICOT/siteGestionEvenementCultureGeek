import db from "../models/index.js"

const getBoutiqueByIdStand = async (req, res) => {
    const id = req.params.idStand;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})
    db.stand.findByPk(id).then((results) => {
        if (results === null || results.idTypeStand !== 1) {
            console.log(results)
            return res.status(404).send({success: 0, data: "le stand n'existe pas ou n'est pas une boutique"})
        } else {
            db.produit.findAll({where: {idStand: id}, include: db.type_produit})
                .then((results) => {
                    return res.status(200).send({success: 1, data: results})
                }).catch((error) => {
                return res.status(404).send({success: 0, data: error})
            })
        }
    })

}

export default {getBoutiqueByIdStand}