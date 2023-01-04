import db from "../models/index.js"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    const pseudo = req.body.pseudo;
    const mdp = req.body.password;
    db.user.findOne({where: {pseudo: pseudo}})
        .then(user=> {
            console.log("user", user)
            bcrypt.compare(mdp, user.password, function (err, result) {
                console.log(result)
                if (result) {
                    return res.status(200).send({success: 1, data: user})
                } else {
                    return res.status(403).send({success: 0, data: "wrong password"})
                }
            });
        })
}

//route a modifier, (utilisé pour le developement du reste
const newUser = async (req, res) => {
    bcrypt.hash("mdpadmin", 10, function(err, hash) {
        if (err)
            return res.status(404).send({success: 0, data: err})
        console.log(hash)
        return res.status(200).send({success:1,data:hash})
    });
}

export default {login,newUser}