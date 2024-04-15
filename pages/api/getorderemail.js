import service from "../../models/serviceModel";
import connectDb from "../../Database/db";
import jwt from "jsonwebtoken";

let handler = async (req, res) => {
   try {
    let { token } = req.query;
    let verifyToken = await jwt.verify(token, "jsonwebtokenforlogin"); // Replace secretOrPublicKey with your actual key
    let { email } = verifyToken; // Extract email from decoded token
    let findOrders = await service.find({ email }).sort({createdAt : -1});
    return res.status(200).json({
        success: true,
        findOrders
    });
   } catch (error) {
    return res.status(500).json({
        success: false,
        msg: "Internal Server Error"
    });
   }
};

export default connectDb(handler);
