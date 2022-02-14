const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//const Store = require('./store')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 9,
    },
    auth_tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('stores', {
    ref: 'Store',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.auth_tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'gloify assignment')
    user.auth_tokens = user.auth_tokens.concat({token})
    await user.save()

    return token
}

userSchema.findByCredentials = async function(email, password) {
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
    {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    user.password = await bcrypt.hash(user.password, 8) //need isModified check if allowing profile edits.
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User