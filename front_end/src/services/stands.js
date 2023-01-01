import axios from "axios";

const addCommentaire = (idStand,texte) => {
    return axios.post("http://localhost:3000/stands/"+idStand+"/commentaire",{
        commentaire:texte
    })
}

const getStand = (idStand) => {
      return axios.get("http://localhost:3000/stands/"+idStand)
}

const getAllStand = () => {
    return axios.get("http://localhost:3000/stands/")
}

const deleteStand = (idStand) => {
    return axios.delete("http://localhost:3000/stands/"+idStand)
}

export default {addCommentaire,getStand,deleteStand,getAllStand}