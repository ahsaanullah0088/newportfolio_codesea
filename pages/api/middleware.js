import  Jwt  from "jsonwebtoken";

let handler = async(req,res) => {
    try {
        let secretKey = "jsonwebtokenforlogin";
        let token = JSON.parse(req.query.token);
        if(token === ""){
            req.push("/")
        }
        let decodeToken = Jwt.verify(token,secretKey);
        if(!decodeToken){
        return res.status(404).json({success:false,msg:"Inavlid Token"})
        } 
        if(decodeToken.email === "govaho920@gmail.com" && decodeToken.name === "admin-ahmed" ){
            return res.status(200).json({success:true,data:{decodeToken,admin:true}})
        }else{
            return res.status(200).json({success:true,data:{decodeToken,admin:false}})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"Internal Server Error"})
    }
}

export default handler;