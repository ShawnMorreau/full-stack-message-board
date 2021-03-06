require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors=require("cors");
const PORT = 8081;
const errorHandler=require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const db = require("./models");
const {checkUserAuthentication,checkUserAuthorization} = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use(
    "/api/users/:id/messages",
    checkUserAuthentication, 
    checkUserAuthorization,
    messagesRoutes);
app.use("/api/messages", checkUserAuthentication, async function(req,res,next){
    try {
        let messages = await db.Message.find()
            .sort({createdAt:"desc"})
            .populate("user",{
                username:true,
                profileImageUrl: true
            });
            return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
})
app.use((req,res,next)=>{
    let err = new Error("Not Found");
    err.status=404;
    next(err);
})
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server starting on port: ${PORT}`);
})