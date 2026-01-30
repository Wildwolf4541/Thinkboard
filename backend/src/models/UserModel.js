import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator"
const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// defining static signup()
userSchema.statics.signup = async function(email,password){
    const exists = await this.findOne({email}) // check if email already exists.

    // validation
    if (!email || !password) throw Error("All fields must be filled");
    if (!validator.isEmail(email)) throw Error("Email is not Valid");
    if (!validator.isStrongPassword(password)) throw Error("Password is not strong enough")

    if(exists) throw Error("Email already exists");

    const salt= await bcrypt.genSalt(10) // add extra 10 random characters to the hashed password.
    const hash= await bcrypt.hash(password,salt) // hash the password and add salt to it
    
    const user= await this.create({email,password:hash}) // create the user

    return user
}

// defining static login
userSchema.statics.login = async function(email,password){
    if(!email||!password) throw Error("All fields must be filled");
    
    const user= await this.findOne({email})

    if(!user) throw Error("User not found. Signup to create account.");

    const match = await bcrypt.compare(password,user.password)

    if(!match) throw Error("Invalid Password");

    return user
}

const UserM= mongoose.model("UserM",userSchema);
export default UserM