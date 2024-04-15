import services from "../../models/serviceModel";
import mongoose from "mongoose";
import connectDb from "../../Database/db";
import multer from "multer";

// let storage = multer.diskStorage({
//     destination : function(req,file,cb) {
//         return cb(null,"./upload/")
//     },
//     filename : function(req,file,cb){
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// let upload = multer({storage});
// const uploadFile = upload.single("file");

let handler = async(req,res) =>{
    try {
        if(req.method === "POST"){
            
               let {name,email,phoneNo,service,budget} = req.body;
               let newData = new services({
                name,email,phoneNo,service,budget
               });
               let data = await newData.save({});
               return res.status(200).json({success:true,msg:"Your Order has Been Placed SuccessFully!"})
        
        }else{
            return res.status(400).json({success:false,msg:"Such Method Not Allowed"})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"Internal Error",error})
    }
}

export default connectDb(handler);
