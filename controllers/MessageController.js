import MessageModel from '../models/MessageSchema.js';


export const addMessage = async(req,res)=>{
    console.log("hrer for sending", req.body)
    
    const {chatId , senderId ,text} = req.body.datas;
    console.log(chatId,senderId)
    const message = new MessageModel({
        ChatId:chatId,
        senderId:senderId,
        text:text
    })
    
    try{
        const result = await message.save();
        console.log(result);
        res.status(200).json(result)


    }
    catch(error){
         console.log(error);
         res.status(500).json(error)
    }

}


export const getMessages = async (req, res) => {

    console.log("here where messaging!!!!")

    const {chatId}=req.params

    try{
        const result = await MessageModel.find({ChatId:chatId});
        console.log("@messaging" ,result )
        res.status(200).json(result)

    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
   }

}