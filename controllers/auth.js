import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();
import UserModel from '../models/user.js';
import Bookings from '../models/orderSchema.js';
import { generateToken } from "../middlewares/authVerify.js"; 
import { SendOtp,VerifyOtp} from '../middlewares/Twilio.js';
import mongoose from 'mongoose';
import Property from '../models/hostSetup.js'





// User-Login-AUTH
export const userAuth = async (req,res)=>{

    const{ num } = req.body
    console.log(req.body);

    try{
        
        const user = await UserModel.findOne({PhoneNumber:req.body.num})
        console.log(user)
        if(user){
            
            SendOtp(req.body.num);
           
            res.status(200).json({message:"Succesfully Done!"})
        
        }
        else{   
     
            return res.status(202).json({message:"no user Registed. Signup please "})
        }
    }
       
    catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }



}

//User-SignUp-auth
export const Signup = async (req,res)=>{
    try{

        console.log(req.body)
        const {FirstName,LastName,DateofBirth,Email,PhoneNumber} = req.body
        console.log(0.1)
        const newUser = new UserModel ({
            FirstName,
            LastName,
            DateofBirth,
            Email,
            PhoneNumber
        })
        console.log(1)
        await newUser.save();
      
        const Token = generateToken(newUser,201);
        console.log(Token,"><<><><")
        res.status(201).json({newUser,Token})

         
        try{
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth :{
                    user:process.env.USER,
                    pass:process.env.PASSWORD
                }
            });
            console.log(Email)
            const mailOptions = {
                from :process.env.USER,
                to :Email,
                subject:"Greetings From Holiday Homes " ,
                html:`<div>
                <h1>Congatutation You have Succesfully Logged in</h1>

                <h1>Dear ${FirstName},</h1>

                <p>Thank you for registering with HOLIDAY HOMES We are thrilled to have you as a new member of our community.</p>
                <p>As a registered user, you now have access to exclusive deals and discounts on hotels and resorts around the world. Whether you're planning a romantic getaway or a family vacation, we have everything you need to make your trip unforgettable.</p>
                
                <p>Thank you again for choosing HOLIDAY HOMES for your travel needs. We look forward to helping you plan your next adventure!

                </p>
             <p>Best regards,</p>
            <h1 style="color: #007bff;">CEO , Mohammed Irfad</h1>
            <h1>Holiday Homes</h1>

                </div>
                `
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error,"errir at email sending")
                }
                else{
                    console.log("email send",info.response)
                }
            })

        }
        catch(err){
            console.log(err)
        }
  
    }
    catch(err){
      
        res.status(500).json({message:"something went wrong"})
    }
}


// Otp-verification

export const OtpVerify = async (req,res)=>{

    try{
        const { otp ,num} = req.body
        console.log(req.body)
        console.log(0,num,otp)
        const response = await VerifyOtp(num,otp);
        console.log(1)
        console.log(response)
        if(response === "approved"){
            console.log(2)
            const User = await UserModel.findOne({PhoneNumber:num})
            console.log(User)
            const Token = generateToken({User,role:"client-Login"});
            res.status(201).json({User,Token})
        }
        else{
            console.log(3)
            res.status(400).json({message:"Something went Wrong"})
        }
    }
    catch(err){
        console.log(err,"err")
        res.status(500).json({message:err})
    }

}


export const googleAuth = async (req,res)=>{

    try{
        const email = req.body.datas.data.email;
        const User = await UserModel.findOne({Email:email})
        console.log(User);
        if(User !== null){
            const Token = generateToken({User,role:"client-Login"});
            res.status(201).json({User,Token})
        } else {
            console.log("Here");
            const { given_name,family_name,picture,email } =req.body.datas.data;
          
          
            const User = new UserModel ({
                FirstName: given_name,
                LastName :family_name,
                Image :picture,
                Email :email,
               
            })
            console.log(1.0)
            await User.save();
          
            const Token = generateToken({User,role:"client-Login"});
            res.status(201).json({User,Token})
    
    
        }
    }
    catch(err){
        res.status(400).json({message:err})
    }

}



// get-user

export const getUser = async (req,res)=>{
   
    try{
       
      
        const { id } = req.query
        const ids = new mongoose.Types.ObjectId(id);
 
        const response = await UserModel.findOne({_id:ids});
        console.log(1)
        console.log(response)
        res.status(200).json(response)

    }
    catch(err){
        console.log(err,"err")
        res.status(500).json({message:err})
    }

}


// Get-user-bookings

export const getMyBookings = async (req,res)=>{
   
    try{
       
        console.log(req.query,"';;;;;;;")
        const { id } = req.query
        const ids = new mongoose.Types.ObjectId(id);
        console.log(ids,"///ids")
        const response = await Bookings.find({owner:ids}).populate("hoster").sort({createdAt:-1})
        console.log(1)
        console.log(response)
        res.status(200).json(response)

    }
    catch(err){
        console.log(err,"err")
        res.status(500).json({message:err})
    }

}

//listed thinh
export const getHostData = async (req, res) => {


    try{
        const {filter} =req.query
        const response = await Property.find( { $and: [ { structure: filter}, { PropertyList: "listed"} ] })
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}