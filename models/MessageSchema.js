import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({

    ChatId:{
        type:String,
    },
    senderId:{
        type:String,
    },
    text:{
        type:String,
    }
},
{
    timestamps:true
});

export default mongoose.model('Mesage',MessageSchema);