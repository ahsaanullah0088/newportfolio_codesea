import mongoose from "mongoose";

let newServices = new mongoose.Schema({
    service : {
        type : String,
        required : true
    }
},{timestamps:true});

mongoose.models = {};

let addServices = new mongoose.model("addServices",newServices);
module.exports = addServices;