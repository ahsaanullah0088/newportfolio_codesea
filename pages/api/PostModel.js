import mongoose from "mongoose";
import blogsModel from "../../models/blogsModel";
import connectDb from "../../Database/db";

let handler = async(req,res) =>{
try {
    if(req.method === "POST"){
       let {title,description,imageUrl} = req.body;
     let newBlog = new blogsModel({
        title,description,imageUrl
     });
     await newBlog.save();
return res.status(200).json({success:true,msg:"Blog Posted SuccessFully!"})
    }else{
return res.status(400).json({success:false,msg:"Post Error"})
    }
} catch (error) {
    return res.status(500).json({success:false,msg:"Internal Error Occured"})
}
}

export default connectDb(handler);
