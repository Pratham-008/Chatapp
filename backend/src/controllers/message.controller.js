import { User } from "../models/User.model.js";
import {Messages} from "../models/Message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import { getReceiverSocketId } from "../lib/socket.js";

export async function getUserForSidebar(req,res){
    try {
        const loggedinUserId=req.user._id;
        const filterdUsers=await User.find({_id:{$ne:loggedinUserId}}).select("-password")

        res.status(200).json(filterdUsers)
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });  
    }
}

export async function getMessages(req,res){
    try {
        const {id:userTochatId}=req.params;
        const myId=req.user._id;
        const messages=await Messages.find({$or:[
            {senderId:myId,receiverId:userTochatId},
            {senderId:userTochatId,receiverId:myId}
        ]})

        res.status(200).json(messages)

    } catch (error) {
        console.log("error in get messages",error)
        res.status(500).json({error:"Internal server Error"})
    }
}

export async function sendMessage(req,res){
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        
        let imageurl;
        if(image){
            const uploadresources=await cloudinary.uploader.upload(image);
            imageurl=uploadresources.secure_url;
        }

        const newMessage=new Messages({
            senderId,
            receiverId,
            text,
            image:imageurl
        })
        await newMessage.save();

        //here socket.io implementation occurs
        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error,"error in sending message")
            res.status(500).json({error:"Internal server error"})
    }
} 