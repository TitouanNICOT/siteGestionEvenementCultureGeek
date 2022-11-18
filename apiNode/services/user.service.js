const getAllUser = async (callback)=>{
    try{
        let users=await userRepo.getAll();
        return callback(null,users)
    }catch (e) {
        return (e)
    }
}

const getUserById = async (id,callback)=>{
    try{
        let users=await userRepo.getById(id);
        if (typeof user=="undefined" || user=="undefined")
            return callback([])
        return callback(null,user)
    }catch (e) {
        return (e)
    }
}


export default {getAllUser,getUserById}