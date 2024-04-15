import connectDb from "../../Database/db";
import newservice from "../../models/newService";
import User from "../../models/user";
import BlogModel from "../../models/blogsModel";
import Services from "../../models/serviceModel";

let handler = async (req,res) => {
    try {
        const [userCount, blogCount, serviceCount, newServiceCount] = await Promise.all([
            User.countDocuments(),
            BlogModel.countDocuments(),
            Services.countDocuments(),
            newservice.countDocuments(), // Assuming `newService` model exists
          ]);
      
        return res.status(200).json({
            success : true,
            userCount, blogCount, serviceCount, newServiceCount
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "Internal Error"
        })
    }
}

export default connectDb(handler);