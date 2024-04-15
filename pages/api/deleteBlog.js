import connectDb from "../../Database/db";
import blogsModel from "../../models/blogsModel";

let handler = async(req,res) =>{
    try {
        if(req.method === "POST"){
           let {_id} = req.body;
           let findBlog = await blogsModel.findOne({_id})
           if(!findBlog){
    return res.status(400).json({success:false,msg:"Blog Not Found"})
           }
           else{
            let deleteBlog = await blogsModel.findOneAndDelete({_id})
            return res.status(200).json({success:true,msg:"Blog Deleted SuccessFully!"})
           }
        }else{
    return res.status(400).json({success:false,msg:"Post Deletion Error"})
        }
    } catch (error) {
        return res.status(500).json({success:false,msg:"Internal Error Occured"})
    }
}

export default connectDb(handler);