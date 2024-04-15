import mongoose from "mongoose";

let blogModel = new mongoose.Schema({
   title : {
     type : String,
     required : true
   },
   description : {
    type : String,
    required : true
   },
   imageUrl : {
    type : String,
    required : true
   }
})

mongoose.models = {};
let blogModels = new mongoose.model("blogModel",blogModel);
module.exports = blogModels;