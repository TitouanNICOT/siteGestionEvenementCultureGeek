const getAllUser = async (callback)=>{
    try{
        let users=await userRepo.getAll();
        if (users===null)
            return callback("erreur")
        return callback(null,users)
    }catch (e) {
        return (e)
    }
}

const getUserById = async (id,callback)=>{
    try{
        let users=await userRepo.getUserById(id);
        if (users===null)
            return callback("erreur")
        return callback(null,users)
    }catch (e) {
        return (e)
    }
}

const newUser = async (data,callback)=>{
    try{
        let users=await userRepo.newUser(data);
        if (users===null)
            return callback("erreur")
        return callback(null,users)
    }catch (e) {
        return (e)
    }
}

const modifUser = async (data,callback)=>{
    try{
        let res=await userRepo.modifUser(data);
        if (!res)
            return callback("erreur")
        return callback(res)
    }catch (e) {
        return (e)
    }
}

const deleteUser = async (id,callback)=>{
    try{
        let res=await userRepo.deleteUser(id);
        console.log("aaaaaaa"+res)
        if (!res)
            return callback("erreur")
        return callback(res)
    }catch (e) {
        return (e)
    }
}


export default {getAllUser,getUserById,newUser,modifUser,deleteUser}