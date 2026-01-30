import UserM from "../models/UserModel.js"
import jwt from "jsonwebtoken"

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET_TOKEN,{expiresIn:"3d"}) // function to create tokens.
}
//login user
const loginUser=async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserM.login(email,password) // login() is the static we defined in model.
        const token =createToken(user._id) // we create a token when user logs in.
        
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
//Signup user
const signupUser=async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserM.signup(email,password) // signup() is the static we defined in model.
        const token =createToken(user._id) // we create a token when user signs up.
        
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export {loginUser, signupUser}