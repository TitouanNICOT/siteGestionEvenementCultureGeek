// const userS = require("../services/user.service")
import userS from "../services/user.service.js"

const list = (req,res) => {
    userS.getAllUser((error,results)=>{
        if (error)
            return res.status(404).send({success:0,data:error})
        return res.status(200).send({success:1,data:results})
    })
}

const newUser = (req,res) => {
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const pseudo = req.body.pseudo
    const password = req.body.password
    const role = req.body.role
    userS.createUser(nom,prenom,email,pseudo,password,role,(status)=>{
        return res.status(200).send({success:status})
    })
}

const getUser = (req,res) => {
  const id = req.params.id;
  if (isNaN(id))
      return res.status(404).send({success:0,data:"id is not a number"})
  userS.getUser(id,(error,results)=>{
      if (error)
          return res.status(404).send({success:0,data:error})
      return res.status(200).send({success:1,data:results})
  })
}

const modifUser = (req,res) =>{
    const id = req.body.id
    if (isNaN(id))
        return res.status(404).send({success:0})
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const pseudo = req.body.pseudo
    const password = req.body.password
    const role = req.body.role
    userS.modifUser(id,nom,prenom,email,pseudo,password,role,(status)=>{
        return res.status(200).send({success:status})
    })
}

const deleteUser = (req,res) => {
  const id = req.params.id;
    if (isNaN(id))
        return res.status(404).send({success:0})
    userS.deleteUser(id,(status)=>{
        return res.status(200).send({success:status})
    })
}

export default {list,newUser,getUser,modifUser,deleteUser};