import connectDb from "../../Database/db";
import newservice from "../../models/newService";

let handler = async (req,res) => {
    try {
        return res.status(200).json({
            success : true,
            msg : ""
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "Internal Error"
        })
    }
}

export default connectDb(handler);