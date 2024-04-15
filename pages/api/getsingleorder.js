import services from "../../models/serviceModel";
import connectDb from "../../Database/db";

let handler = async (req,res) => {
try {
    let {_id} = req.query;
    let findOrder = await services.findOne({_id});
    return res.status(200).json({
        success : true,
        findOrder
    })
} catch (error) {
    return res.status(500).json({
        success : false,
        msg : "Internal Server Error"
    })
}
}

export default connectDb(handler)