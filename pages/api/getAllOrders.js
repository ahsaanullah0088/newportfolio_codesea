import service from "../../models/serviceModel";
import connectDb from "../../Database/db";

let handler = async(req,res)=>{
try {
    let findOrders = await service.find().sort({updatedAt:-1});
     // Send fetched orders in the response
     return res.status(200).json({ success: true, orders: findOrders });
} catch (error) {
    return res.status(500).json({success:false,msg:"Internal Error",error})
}
}

export default connectDb(handler);