import mongoose from 'mongoose';
import validator from 'validator';


const OrderSchema =new mongoose.Schema({

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    hoster:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Property"
    },
    Check_in:{
        type:String
    },
    Check_out:{
        type:String
    },
    NumberOffdays:{
        type:Number
    },
    PaymentMethod:{
        type:String
    },
    Amount:{
        type:String
    },
    paymentstatus:{
        type:String,
        default:"pending"
    },
    orderstatus:{
        type:String,
        default:"pending"
    },
    Date:{
        type:Date,
        default: new Date()
    },
    payment:{
        type:String,
    },
    complaints:{
        type:String,
    },
    



},
{timestamps: true}
);


export default mongoose.model('order', OrderSchema);