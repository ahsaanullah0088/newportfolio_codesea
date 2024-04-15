import mongoose from "mongoose";
import blogsModel from "../../models/blogsModel";
import connectDb from "../../Database/db";

let handler = async(req,res) =>{
    try {
        if(req.method === "POST"){
           let {title,description,imageUrl,_id} = req.body;
            let updateBlog = await blogsModel.findOneAndUpdate({_id},{
                title,description,imageUrl
            })
    return res.status(200).json({success:true,msg:"Blog Updated SuccessFully!"})
        }else{
    return res.status(400).json({success:false,msg:"Post Error"})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"Internal Error Occured"})
    }
    }

export default connectDb(handler);