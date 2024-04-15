import newService from "../../models/newService";
import connectDb from "../../Database/db";

let handler = async(req,res)=>{
    try {
        if(req.method ==="POST"){
         let {service} = req.body;
         let newServices = new newService ({
            service
         });
         await newServices.save();
         return res.status(200).json({success:true,msg:"Service Added"})
        }else{
        return res.status(400).json({success:false,msg:"Post error"})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"Internal error"})
    }
}

export default connectDb(handler);