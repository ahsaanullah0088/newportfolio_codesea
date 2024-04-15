import connectDb from "../../Database/db";
import blogModel from "../../models/blogsModel";

let handler = async (req,res) => {
try {
    let {title} = req.query;
    let findBlog = await blogModel.findOne({title});
    return res.status(200).json({
        success : true,
        findBlog
    })
} catch (error) {
    return res.status(500).json({
        success : false,
        msg : "Internal Server Error"
    })
}
}

export default connectDb(handler);