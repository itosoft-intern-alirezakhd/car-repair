import User from "../../models/user-model.js";
import Role from "../../models/role-model.js";
import mongoose from "mongoose";

export default async (req , res, next)=>{
    try{

    let userLogged = res.locals.loggedInUser;
    if(!userLogged) return res.status(401).json({message : "user does not exist"})
    let user = await User.findOne({_id : userLogged._id});
    const role = await Role.findById({
        _id : user.role
    })
    if(role.role ==="superAdmin"){
        next()
    }else{
        return res.status(401).json({message : "you are not superAdmin"});
    }
    }catch(error){
        next(error);
    }
}