import axios from "axios";

const getEvenement = (idEvenement) => {
    return axios.get("http://localhost:3000/evenements/" + idEvenement)
}

const getAllEvenement = () => {
    return axios.get("http://localhost:3000/evenements/")
}

const deleteEvenement = (idEvenement) => {
    return axios.delete("http://localhost:3000/evenements/" + idEvenement)
}

export default {getEvenement, deleteEvenement, getAllEvenement}