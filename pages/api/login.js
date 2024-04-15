import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "../../Database/db";

let handler = async(req,res) => {
try {
    
    if(req.method === "POST"){
       let {email,password} = req.body;
       let findUser = await User.findOne({email});
       if(findUser){
        let checkPassword = await bcrypt.compare(password, findUser.password);
        if(checkPassword){
            let token =  jwt.sign({email : findUser.email,name : findUser.name},"jsonwebtokenforlogin"
            )
            return res.status(200).json({success:true,msg:"Login SuccessFully!",token});
        }else{
        return res.status(400).json({success:false,msg:"Invalid Cretendials"});

        }
       }else{
        return res.status(400).json({success:false,msg:"Invalid Cretendials"});
       }
    }else{
        return res.status(400).json({success:false,msg:"ISuch Method Not Allowed"});
    }
} catch (error) {
    console.error("Internal Error:", error); 
    return res.status(500).json({success:false,msg:"Internal Error",error});
}

}

export default connectDb(handler);