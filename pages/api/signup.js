import connectDb from "../../Database/db";
import mongoose from "mongoose";
import User from "../../models/user";
import bcrypt from "bcryptjs"
let handler = async (req, res) => {

    try {
        if (req.method === "POST") {
            let { name, email, password } = req.body;
            let findUser = await User.findOne({email})
            if(findUser){
            return res.status(404).json({ success: false, msg: "Such User Already Exist" });
            }
            // Hash the password
            const hash = await bcrypt.hash(password, 10);

            // Create a new user with the hashed password
            let newUser = new User({
                name, 
                email, 
                password: hash
            });

            // Save the new user to the database
            await newUser.save();
                return res.status(200).json({ success: true, msg: "User Created SuccessFully!" });
           
        } else {
            return res.status(404).json({ success: false, msg: "Such Method Not Allowed" });
        }

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal Error Occured" });
    }

}

export default connectDb(handler);