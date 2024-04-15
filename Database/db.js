import mongoose from "mongoose";



const connectDb = handler => async (req, res)=>{
  try {
    if(mongoose.connections[0].readystate){
        return handler(req,res)
    }
        await mongoose.connect(process.env.MONGODB_URI)
        
        return handler(req,res);
  } catch (error) {
    console.log(error)
  }
}
export default connectDb;
