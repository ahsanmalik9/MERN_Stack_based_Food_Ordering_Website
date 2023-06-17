const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },

    location:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true
    },

    password:{
        type: String,
        required:true
    },

    date:{
        type: Date,
        default:Date.now
    },
}); 

// model ki help data insert krty hain db me 
// Model k through CRUD Operation perform krty hain
module.exports = mongoose.model('user', UserSchema)//user nam ka collection bn jaye ga database me

