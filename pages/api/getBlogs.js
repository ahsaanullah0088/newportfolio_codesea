import connectDb from "../../Database/db";
import blogsModel from "../../models/blogsModel";

let handler = async (req,res) => {
    try {
        let blogs = await blogsModel.find({});
        if(blogs){
            blogs = blogs.reverse();
            return res.status(200).json({
                success : true,
                blogs
            })
        }else{
            return res.status(200).json({
                success : true,
                msg : "No Blogs Found"
            })
        }
       
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "Internal Error"
        })
    }
}

export default connectDb(handler);