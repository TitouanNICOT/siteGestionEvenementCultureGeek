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

    db.reserverProduit.findByPk(id).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getReservationProduitByUser = (req, res) => {
    const sql = `SELECT quantite,"reserverProduits"."idUser",produits."idProduit","libelleProduit" FROM "reserverProduits"
               INNER JOIN produits ON "reserverProduits"."idProduit" = produits."idProduit"
               WHERE "reserverProduits"."idUser" = ?`;
    db.sequelize.query(sql, {replacements:[parseInt(req.params.idUser)], type: db.sequelize.QueryTypes.SELECT})
        .then((results) => {
            console.log(results)
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
    }).then(async () => {
        const produit = await db.produit.findByPk(req.body.idProduit)
        if (produit.quantite - req.body.quantite < 0)
            return res.status(404).send({success: 0, data: "quantite insuffisante"})
        db.produit.update({
            quantite: produit.quantite - req.body.quantite
        },{
            where: {idProduit: req.body.idProduit}
        })
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
        'where "idReserveProd"=?;',
        {replacements: [quantite, idUser, idProduit, id]}
    ).then(() => {
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

    db.reserverProduit.destroy({where: {idReserveProd: id}})
        .then(() => {
            return res.status(200).send({success: 1})
        }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const getReservationProduitByPrestataire = (req, res) => {
    const sql = 'SELECT quantite,"reserverProduits"."idUser",produits."idProduit","libelleProduit" FROM "reserverProduits" ' +
        'inner join produits on produits."idProduit"="reserverProduits"."idProduit" ' +
        'inner join stands on stands."idStand"=produits."idStand" ' +
        'inner join users on users."idUser"=stands."idPrestataire" ' +
        'WHERE users."idUser" = ?'
    db.sequelize.query(sql, {replacements: [parseInt(req.params.idPresta)], type: db.sequelize.QueryTypes.SELECT})
        .then((results) => {
            console.log(results)
            return res.status(200).send({success: 1, data: results})
        }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {
    list,
    newReservationProduit,
    getReservationProduitById,
    modifReservationProduit,
    deleteReservationProduit,
    getReservationProduitByUser,
    getReservationProduitByProduit,
    getReservationProduitByPrestataire
};