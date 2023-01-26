import db from "../models/index.js"

const list = async (req, res) => {
    const role = req.query.role
    db.user.findAll({include: db.role}).then((results) => {
        if (role && ["admin", "prestataire", "visiteur"].includes(role))
            results = results.filter((user) => user.role.libelle === role)
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success: 0, data: "id is not a number"})

    db.user.findByPk(id).then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const newUser = async (req, res) => {
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

const modifUser = async (req, res) => {
    const id = req.params.id
    if (isNaN(id))
        return res.status(404).send({success: 0})

    var {nom, prenom, pseudo, password, email, isNotif, idRole} = req.body
    const user = await db.user.findByPk(id)
    console.log(user)

    console.log(req.body)
    db.user.update({
        nom: nom ? nom : user.nom,
        prenom: prenom ? prenom : user.prenom,
        pseudo: pseudo ? pseudo : user.pseudo,
        password: password ? password : user.password,
        email: email ? email : user.email,
        isNotif: isNotif ? isNotif : user.isNotif,
        idRole: idRole ? idRole : user.idRole
    }, {
        where: {idUser: id}
    }).then(async() => {
        const data = await db.user.findByPk(id)
        return res.status(200).send({success: 1, data: data})
    }).catch((error) => {
        console.error(error)
        return res.status(404).send({success: 0})
    });
}

const deleteUser = async (req, res) => {
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

const listRole = async (req, res) => {
    db.role.findAll().then((results) => {
        return res.status(200).send({success: 1, data: results})
    }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

const getAllCommentaire = (req, res) => {
    const sql = 'SELECT "idLivreOr",commentaire,"stands"."idStand" FROM "livreOr" ' +
        'inner join stands on stands."idStand"="livreOr"."idStand" ' +
        'inner join users on stands."idPrestataire"=users."idUser" ' +
        'WHERE "idUser" = ?'
    db.sequelize.query(sql, {replacements: [parseInt(req.params.id)], type: db.sequelize.QueryTypes.SELECT})
        .then((results) => {
            console.log(results)
            return res.status(200).send({success: 1, data: results})
        }).catch((error) => {
        return res.status(404).send({success: 0, data: error})
    })
}

export default {list, newUser, getUserById, modifUser, deleteUser, listRole, getAllCommentaire};