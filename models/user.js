const mongoose = require("mongoose");

let UserModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps: true});

mongoose.models= {};
let User = new mongoose.model("User",UserModel);
module.exports = User;