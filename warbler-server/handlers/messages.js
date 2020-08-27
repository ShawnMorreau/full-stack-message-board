const db = require("../models");
// /api/users/:id/messages
exports.createMessage = async function(req,res,next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        let foundMessage = await db.Message.findById(message._id).populate("user",{
            username:true,
            profileImageUrl:true
        });
        return res.status(200).json(foundMessage);
    }catch(e){
        return next(e);
    }
}
exports.getMessage = async function(req,res,next){
    try {
        let message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);
    } catch (e) {
        return next(e);
    }
}
exports.deleteMessage = async function(req,res,next){
    try {
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json("Message successfully removed!");
    } catch (err) {
        return next({message:"Message does not exist!"});
    }
}
//5f3df5363ff74a39bdb22444
// http POST localhost:8081/api/users/5f3b1fa94d693f1ee42b794d/messages/ 
// "Authorization:Barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2IxZmE5NGQ2OTNmMWVlNDJiNzk0ZCIsInVzZXJuYW1lIjoic2hhd24iLCJpYXQiOjE1OTc4OTE2Mjd9.kKWxnxpqZRlMgmxNL4L_z5omfXzEpRrRRAr4XiYeF7c"


