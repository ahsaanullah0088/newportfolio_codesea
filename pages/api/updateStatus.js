import mongoose from "mongoose";
import service from "../../models/serviceModel";
import connectDb from "../../Database/db";

let handler = async(req,res) =>{
try {
    if(req.method === "POST"){
     let {status,_id} = req.body;
     let updateStatus = await service.findOneAndUpdate({_id},{
        Status:status
     },{new:true});
     return res.status(200).json({success:true,msg:"Status Updated SuccessFully !"})
    }else{
        return res.status(400).json({success:false,msg:"Such Method Not Allowed"})
    }
} catch (error) {
    return res.status(500).json({success:false,msg:"Internal Error Occured"})
}
}

export default connectDb(handler);