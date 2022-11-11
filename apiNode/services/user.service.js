// const fs = require('fs')
import fs from "fs"

const getAllUser = (libelle,callback)=>{
    const data = lireFichier();
    if (data===[])
        return callback("erreur lecture");
    const role=data.roles.find(r=>r.libelle===libelle);
    console.log(role,libelle);
    if (role===undefined)
        return callback(null,data.users)
    else
        return callback(null,data.users.filter(u=> u.role===role.code));
}

const createUser = (nom,prenom,email,pseudo,password,role,callback)=>{
    const data = lireFichier();
    const id=Math.max(...data.users.map(u=>parseInt(u.id)))+1;
    const tmp = {
        id:id.toString(),
        nom: nom,
        prenom:prenom,
        email:email,
        pseudo:pseudo,
        password:password,
        role:role
    }
    console.log(tmp)
    data.users.push(tmp)
    return saveFichier(data,callback);
}

const modifUser = (id,nom,prenom,email,pseudo,password,role,callback)=>{
    const data = lireFichier();
    data.users.forEach(u=>{
        if (id===u.id){
            if (nom !== undefined && nom!=="") u.nom=nom;
            if (prenom !== undefined && prenom!=="") u.prenom=prenom;
            if (email !== undefined && email!=="") u.email=email;
            if (pseudo !== undefined && pseudo!=="") u.pseudo=pseudo;
            if (password !== undefined && password!=="") u.password=password;
            if (role !== undefined && role!=="") u.role=role;
        }
    })
    return saveFichier(data,callback);
}

const getUser = (id,callback) => {
    const data = lireFichier();
    console.log(typeof id+" "+typeof data.users[0].id)
    const res = data.users.find(u=>u.id===id)
    if (res)
        return callback(null,res);
    return callback("cet id n'existe pas");

}

const deleteUser = (id,callback) => {
  const data = lireFichier();
  const index = data.users.findIndex(u=>u.id===id)
    if (index===-1)
        return callback(0)
    data.users.splice(index,1);
    return saveFichier(data,callback);
}

export default {getAllUser,createUser,getUser,modifUser,deleteUser};


const lireFichier = () => {
    try {
        const dataBuffer = fs.readFileSync('./databases/user.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log("error lire fichier")
        return [];
    }
}

const saveFichier = (users,callback) =>{
    try {
        const data = JSON.stringify(users);
        fs.writeFileSync("./databases/user.json", data);
        return callback(1)
    }catch (e){
        console.log("error sauvegarde fichier")
        return callback(0);
    }
}