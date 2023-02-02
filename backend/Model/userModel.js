const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true   
    }
},{timestamps: true})

// attaching a signup method to the schema
// this custom method will work same as schema.create(), schema.find() ...
userSchema.statics.signup = async function(email, password){

    // validate the email and password prior making request
    if(!email || !password){
        throw Error('All fields required')
    }
    if(!validator.isEmail(email)){
        throw Error('Invalid email')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    // check if the user email already exist
    const isEmailExist = await this.findOne({email})

    if(isEmailExist){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email, password:hash})

    return user

}

userSchema.statics.login = async function(email, password) {
    if(!email || !password){
        throw Error('All field are required')
    }

    // check if the user has signed up i.e. exist in the user db
    const user = await this.findOne({email})

    if(!user){
        throw Error('Invalid user')
    }

    // compare the password against the hashed password in db
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        throw Error('Invalid password')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)