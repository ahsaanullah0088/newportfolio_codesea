import connectDb from "../../Database/db";
import newservice from "../../models/newService";
import nodemailer from "nodemailer"

let handler = async (req,res) => {
    try {
        if(req.method === "POST"){
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL, // your Gmail address
                    pass: process.env.NEXT_PUBLIC_PASSWORD // your Gmail password
                }
            });

            let mailOptions = {
                from: req.body.email,
                to: process.env.NEXT_PUBLIC_EMAIL,
                subject: 'Order Request',
                html: `
                <h2>Order Request Details</h2>
                <br>
                <p><strong>Name:</strong> ${req.body.name}</p>
                <br>
                <p><strong>Email:</strong> ${req.body.email}</p>
                <br>
                <p><strong>Service:</strong> ${req.body.service}</p>
                <br>
                <p><strong>Budget:</strong> ${req.body.budget}</p>
                <br>
                <p><strong>Phone Number:</strong> ${req.body.phoneNo}</p>
                <br>
                <p>View all orders in the dashboard <a href="${process.env.NEXT_PUBLIC_HOST}/dashboard/previewOrders">here</a>.</p>
            `
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    return res.status(200).json({
                        success : true,
                        msg : "Email Not Send SucessFully"
                    })
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({
                        success : true,
                        msg : "Email Send SucessFully"
                    })
                }
            });

         
        }
        else{
            return res.status(400).json({
                success : false,
                msg : "Such MEthod Not Allowed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            msg : "Internal Error"
        })
    }
}

export default handler;