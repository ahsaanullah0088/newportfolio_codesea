const mongoose = require("mongoose");

let serviceModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    phoneNo : {
        type : Number,
        required : true
    },
    service : {
        type : String,
        required : true
    },
    budget :{
        type : String,
        required : true
    },
    Status:{
        type : String,
        default : "pending"
    }
},{timestamps: true});

mongoose.models= {};
let services = new mongoose.model("serices",serviceModel);
module.exports = services;