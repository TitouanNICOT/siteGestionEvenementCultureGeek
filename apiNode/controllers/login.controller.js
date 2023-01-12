import db from "../models/index.js"
import bcrypt from "bcrypt"
import {generateToken} from "../middleware/authentification.js";

const login = async (req, res) => {
    const pseudo = req.body.pseudo;
    const mdp = req.body.password;
    db.user.findOne({where: {pseudo: pseudo}})
        .then(user => {
            if (!user) return res.status(404).send({success: 0, data: "User not found"})
            bcrypt.compare(mdp, user.password, function (err, result) {
                if (result) {
                    return res.status(200).send({success: 1, data: user, token: generateToken(user)})
                } else {
                    return res.status(403).send({success: 0, data: "wrong password"})
                }
            });
        })
}


const register = async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const pseudo = req.body.pseudo;
    const password = req.body.password;
    const email = req.body.email;
    const role = req.body.idRole;
    const isNotif = req.body.isNotif;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return res.status(500).send({success: 0, data: err})
        } else {
            db.user.create({
                nom: nom,
                prenom: prenom,
                pseudo: pseudo,
                password: hash,
                email: email,
                isNotif: isNotif,
                idRole: role
            }).then(user => {
                return res.status(200).send({success: 1, data: user, token: generateToken(user)})
            }).catch(err => {
                return res.status(501).send({success: 0, data: err})
            });
        }
    });
}

export default {login, register}