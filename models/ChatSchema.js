import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema({

    members:{
        type:Array,
    },
},
{
    timestamps:true
});

export default mongoose.model('Chat',ChatSchema);