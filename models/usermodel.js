const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const dotenv=require("dotenv");
 require("dotenv").config();

const userSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },

 }, { timestamps:true })
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
         _id: this._id,
        number: this.number
    }, process.env.JWT_SECRET_KEY)
return token
}

module.exports = mongoose.model('User', userSchema);