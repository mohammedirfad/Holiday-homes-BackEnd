// ADMIN-REQUESTS ______________________

import Property from '../models/hostSetup.js';
import Admin from '../models/Admin.js';
import Order from '../models/orderSchema.js'
import BankSchema from '../models/HostDetails.js'
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { generateToken } from '../middlewares/authVerify.js';


//Admin-login :


export const adminLogin = async (req,res)=>{
    try{

       
        const {email,password} = req.body
  
        const response = await Admin.findOne({Email:email , Password:password});
       

        if(response !== null){
            const Token = generateToken({response,role:"Admin-Login"})
            res.status(200).json({response,Token})
        }
        else{
            res.status(200).json({message:"incorrect"})
        }
        
      
        // const Token = generateToken(newUser,201);
        // console.log(Token,"><<><><")
        

    }
    catch(err) {
        console.error(err);
    }
}

// host-pending-requets..

export const Hostpendingrequest = async (req, res) => {
    

    try{
        const response = await Property.find({Verification_list:"Verification Pending"}).sort({createdAt:-1});
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}



// host-approved-requets..

export const HostApprovedrequest = async (req, res) => {
   

    try{
        const response = await Property.find({Verification_list:"Verification Approved"}).sort({createdAt:-1});
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// host-rejected-requets..

export const HostRejectedrequest = async (req, res) => {
    

    try{
        const response = await Property.find({Verification_list:"Add your id proof properly"}).sort({createdAt:-1});
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// host-admin-approvel..

export const hostApprovel = async (req, res) => {
    console.log("admin Here",req.body);

    try{
        const {id} =req.body
        const response = await Property.updateOne({_id:id},{$set:{Verification_list:"Verification Approved" ,PropertyList:"listed"}})
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


// host-admin-rejected..

export const hostRejected = async (req, res) => {
    console.log("admin Here",req.body);

    try{
        const {id} =req.body
        const response = await Property.updateOne({_id:id},{$set:{Verification_list:"Add your id proof properly" ,PropertyList:"unlisted"}})
      
        const BankDetails = await 
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

// get-hostData ....

export const getHostData = async (req, res) => {
    console.log("admin Here",req.query);

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


//admin payment-requets:


export const getPaymentRequests = async (req, res) => {
    

    try{
        const response = await Order.find({$or: [ { payment: "Payment Requested" }, { paymentstatus: "Refunding" } ]}).populate("hoster").sort({createdAt:-1});
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}



// get-hostBankData ....

export const getBankDetails = async (req, res) => {
    console.log("admin Here",req.query);

    try{
        const {id} =req.query
        const response = await BankSchema.findOne( {owner:id })
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}

//paymentUPdate :
export const paymentSucesss = async (req, res) => {
    console.log("admin Here",req.body);

    try{
        const {host_id} =req.body
        const response = await Order.updateOne( {_id:host_id },{$set:{payment:"Completed"}})
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


export const getOrders = async (req, res) => {
  

    try{

        // const response = await Order.find({}).populate("hoster")
        const response=await Order.find({})
  .populate([
    { path: 'owner', },
    { path: 'hoster',
    populate:([
       { path: 'owner'}
  ])

},
    
  ])
      
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


//search


export const onSuggestionsFetchRequested = async (req, res) => {
    console.log("admin Here",req.body);

    try {
        const searchTerm = req.body.searchTerm;
        const regex = new RegExp(searchTerm, "i");
        const suggestionQuery = {
          $or: [{ name: regex }, { _id: ObjectId.isValid(searchTerm) ? ObjectId(searchTerm) : null }]
        };
        console.log(suggestionQuery)
        const suggestionResults = await Property.find(suggestionQuery)
          .limit(10)
          .exec();

          console.log(suggestionResults)
        const suggestions = suggestionResults.map((detail) => ({
          id: detail._id,
          value: detail.name
        }));
        console.log(suggestions)
        res.status(200).json(suggestions);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching suggestions." });
      }
}

const getMonthName = (monthNumber) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[monthNumber - 1]
}


//dashboard :

export const getdashBoard = async (req,res)=>{
    try {
        console.log('object')
        const profit = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%m", date: "$createdAt" } },
                    profit_count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])
        console.log(profit);
        const result =  profit.map((report)=>{
            const month = getMonthName(report._id)
            report.month = month
            return report
        }) 
        const pending = await Order.find({ paymentstatus: "Refunding" }).count()
        const complete = await Order.find({ orderstatus: "Completed" }).count()
        const cancel = await Order.find({ orderstatus: "Cancelled" }).count()
        const completePayment = await Order.find({ paymentstatus: "Completed" }).count()
        console.log(cancel,"...............................");
        let data =[];
        data.push(pending)
        data.push(complete)
        
        data.push(cancel)
        data.push(completePayment)

        
        res.status(200).json({result,data});
    } catch (err) {
        console.log(err);
        // res.status(500).json({ error:"internal server error" });
    }
}