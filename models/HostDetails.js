import mongoose from 'mongoose';
import validator from 'validator';

const HostDetails =new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Address:{
        streetAddress:{
            type:String
        },
        Flat:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        zipCode:{
            type:Number
        }
    },
    status:{
        type:String
    },

    BankDetails:{
        BankName:{
            type:String
        },
        AccountHolderName:{
            type:String
        },
        AccountNumber:{
            type:Number
        },
        IFSC:{
            type:Number
        },
        PAN:{
            type:String
        },
    }

},{
    timestamps:true
})

export default mongoose.model('HostDetail',HostDetails);