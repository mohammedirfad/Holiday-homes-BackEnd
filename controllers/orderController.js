import mongoose, { Mongoose } from 'mongoose';
import nodemailer from 'nodemailer';
import orderSchema from '../models/orderSchema.js';
import UserModel from '../models/user.js';
import Property from '../models/hostSetup.js';
import { response } from 'express';


export const OrderData = async (req, res) => {

    try{
        
        const {user_id,host_id,checkin,checkout,NumberOffdays,Amount,PaymentMethod} = req.body;
        const User = await UserModel.findOne({_id:user_id})
        const response = await Property.updateOne({_id:host_id},{$set:{selectedDate:checkout}})

        if(User!=null){
           const orders = new orderSchema({
                owner:user_id,
                hoster:host_id,
                Check_in:checkin,
                Check_out:checkout,
                NumberOffdays:NumberOffdays,
                PaymentMethod:PaymentMethod,
                Amount:Amount,

                paymentstatus:"Completed",
                orderstatus:"Completed"

           })
           await orders.save();
          
           res.status(200).json({orders})

           try{
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth :{
                    user:process.env.USER,
                    pass:process.env.PASSWORD
                }
            });
   
            const mailOptions = {
                from :process.env.USER,
                to :User.Email,
                subject:"Your Booking Confirmation" ,
                html:`<h3 style="color: #007bff;">Your Booking Confirmation</h3>
                <p>Dear [Irfad],</p>
                <p>Thank you for booking with [Website Name]! We are excited to confirm your reservation and look forward to providing you with a fantastic experience.</p>
                <p>Here are the details of your booking:</p>
                <ul>
                    <li>Booking ID: ${orders._id}</li>
                    <li>Booking Date:${new Date()}</li>
                    <li>Check-In Date: ${orders.Check_in}</li>
                    <li>Check-Out Date: ${orders.Check_out}</li>
                    <li>Number of Guests:${4}</li>
                    <li>Booking Total: ${orders.Amount}</li>
                </ul>
                <p>Please review the above details to ensure that everything is correct. If you have any questions or need to make changes to your booking, please contact us as soon as possible.</p>
                <p>We understand that travel plans can change, so we offer a flexible cancellation policy for most bookings. Please refer to the booking confirmation email or your account dashboard for more information.</p>
                <p>If you would like to view your bookings,<br> <a href="https:http://localhost:3000/Mybookings"><button style="background-color: #007bff;">View Your Booking</button></a>.</p> <br>
                <p>If you require any additional services, such as airport transfers or restaurant reservations, please <a href="https:http://localhost:3000/Mybookings">View Your Bookings</a> to view our additional services.</p>
                <p>Thank you for choosing [Website Name] for your travel needs. We hope you have a wonderful trip and look forward to serving you again in the future.</p>
                <br>
                <p>Best regards,</p>
                <p>CEO , Mohammed Irfad</p>
                <p>Holiday Homes</p>`
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
        else{
           res.status(400).json({message: "User not found"});

        }

    }
    catch(err){
        console.log(err,"err at the host addresss")
     }
}




export const OrderCancell = async (req, res) => {
   try{
       console.log("Host")
       console.log(req.body)
       const {order_id,host_id,checkin} = req.body;

       const User = await Property.updateOne({_id:host_id},{$set:{selectedDate:checkin}});
       const response = await orderSchema.updateOne({_id:order_id},{$set:{orderstatus:"Cancelled" ,paymentstatus:"Refunding"}})

       res.status(200).json({message:"updated"})
       }
   catch(err){
       console.log(err,"err at the host addresss")
       res.status(500).json({message:"error"})
    }
}



export const OrderStatus = async (req, res) => {
   try{
       console.log("Host")
       console.log(req.query)
       const {orderstatus } = req.query;

       await orderSchema.aggregate([
        {
          $lookup: {
            from: 'properties',
            localField: 'hoster',
            foreignField: '_id',
            as: 'hosterDetails'
          }
        },
        {
          $unwind: '$hosterDetails'
        },

        {
          $match: {
            orderstatus: 'Completed',
            "hosterDetails.owner": new mongoose.Types.ObjectId(orderstatus),
            
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: '_id',
            as: 'ownerDetails'
          }
        },
        {
          $unwind: '$ownerDetails'
        },
      
      ]).then(function(orders) {
        console.log(";;;;",orders);
        res.status(200).json(orders)

      }).catch(function(err) {
        res.status(500).json("error")
      });
            
      //  const find = await UserModel.find({_id:orderstatus});
       
      //  const User = orderSchema.find()
      //  .populate({
      //       path: 'hoster',
      //       match: { owner: orderstatus } // filter the HostDetails documents with a matching owner field value
      //     })
      
      // const User = await orderSchema.find({}).populate("hoster")
      
      // console.log(User,"lll")
      // const doc = User.find({"hoster.owner" :orderstatus})

      // console.log(doc,".......................................................")
//       let newArray = [];
//       const orders = await orderSchema.find({orderstatus:"Completed"})
//       .populate({
//         path: 'hoster',
//       //   match: { owner: new mongoose.Types.ObjectId(orderstatus) }
//       })
//       // .find({'hoster.owner': new mongoose.Types.ObjectId(orderstatus) })
//       console.log(orders," orders")
//     for (let i = 0; i < orders.length; i++) {
//       // console.log(orders[i].hoster.owner)
// const objectId = orders[i].hoster.owner.toString()
// // console.log(objectId)
//      if(orderstatus==orders[i].hoster.owner){
//       console.log("match")
//       newArray.push(orders[i])
//      }
      
//     }
//     console.log(newArray);
      // console.log(abd,"lllssxx")
         
       }
     


   catch(err){
       console.log(err,"err at the host addresss")
       res.status(500).json({message:"error"})
    }
}



//Host-payment request :

export const paymentRequest = async (req, res) => {

 const {host_id} = req.body

  try {
     const a = new mongoose.Types.ObjectId(host_id)
     const response =  await orderSchema.updateOne({hoster:a}, { $set: {payment:"Payment Requested"} },{upsert:true}, { new: true })
     res.status(200).json({message:"updated successfully"})
      
  }
  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}


//Host-camplaint request :

export const complaintRegister = async (req, res) => {

  const {order_id,complaint} = req.body;

  try {
     const a = new mongoose.Types.ObjectId(order_id)
     const response =  await orderSchema.updateOne({_id:a}, { $set: {complaints:complaint} },{upsert:true}, { new: true })
    res.status(200).json({message:"updated successfully"})
      
  }
  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}



//Host-bloack :

export const BlocktheHost = async (req, res) => {
  console.log("heer iam aaaaaaaaaaaaaaa",req.body)
  const {host_id,complaint} = req.body;

  try {
     const a = new mongoose.Types.ObjectId(host_id)
     const response =  await Property.updateOne({_id:a}, { $set: {block:true,BlockReason:complaint} },{upsert:true}, { new: true });
     console.log(response)
     res.status(200).json({message:"updated successfully"})
      
  }
  catch (err) {
      console.log(err)
      res.status(500).json({ message: err })
  }
}