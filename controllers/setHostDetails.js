import mongoose from 'mongoose';
import Hostdetails from '../models/HostDetails.js';
import UserModel from '../models/user.js';

//host-Address
export const HostAddress = async (req, res) => {
    try{
       
        console.log(req.body)
        const {streets,flats,citys,states,zipcodes,id} = req.body;

        const User = await UserModel.find({_id:id})
        if(User!=null){
           const users = new Hostdetails({
                owner:id,
                Address:{
                    streetAddress:streets,
                    Flat:flats,
                    city:citys,
                    state:states,
                    zipCode:zipcodes
                },
                status:"Address Added"
           })
           await users.save();
           console.log("User",users._id);
           res.status(200).json(users._id)
        }
        else{
           res.status(400).json({message: "User not found"});
        }

    }
    catch(err){
        console.log(err,"err at the host addresss")
     }
}

//host-bank-details 

export const HostBanksetup = async (req, res) => {
    try{
     
        console.log(req.body)
        const {accountName,accountNumber,branch,ifscCode,pan,id,user_id} = req.body;

        const User = await UserModel.find({_id:user_id})
        if(User!=null){
            const a = new mongoose.Types.ObjectId(id)
            await Hostdetails.findByIdAndUpdate(
                { _id:a},
                { $set: {"BankDetails.BankName" : branch, "BankDetails.AccountHolderName": accountName,"BankDetails.AccountNumber":accountNumber,"BankDetails.IFSC":ifscCode,"BankDetails.PAN":pan,status:"Bank Added"} },
                {upsert:true},
                { new: true },
                (err, item) => {
                  if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                  } else if (!item) {
                    res.status(404).send('Item not found');
                  } else {
                
                    res.status(200).json({item});
                  }
                }
              );
              console.log("Host0")
        }
        else{
            console.log("Host9")
           res.status(400).json({message: "User not found"});
        }

    }
    catch(err){
        console.log(err,"err at the host addresss")
     }
}