import ChatModel from '../models/ChatSchema.js';



export const createChat = async (req,res) =>{

    const newChat = new ChatModel ({
        members :[req.body.senderId , req.body.receiverId]
    });

    try{
        const result = await newChat.save();
        res.status(200).json(result);

    }
    catch(err){
        console.error("error occured ", err)
        res.status(500).json(err)
    }
}


export const userChats = async (req, res) => {
    console.log("here")

    try{
        const chat = await ChatModel.find({
            members :{$in :[req.params.userId]}
        })
        res.status(200).json(chat);

    }
    catch(err){
        console.error("error occured ", err)
        res.status(500).json(err)
    }

}


export const findChat = async (req,res) =>{

    try{
        const chat = await ChatModel.findOne({
            members: {$all :[req.params.firstId , req.params.secondId]}
        })
        res.status(200).json(chat);
    }
    catch(err){
        console.error("error occured ", err)
        res.status(500).json(err)
    }
}

