import express from "express";
import {UserModel,contentModel} from "./db";
import jwt from "jsonwebtoken";
import { secret } from "./pass";
import { UserMiddleware } from "./middleware";

const app = express();
app.use(express.json());

app.post("/api/v1/signin", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,password
    })
    if(existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        },secret)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

app.post("/api/v1/signup", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try
    {
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "User signed up"
        })
    }catch(e){
        res.status(411).json({
            "message": "User already exists"
        })
    }
})

app.get("/api/v1/content",UserMiddleware ,async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId
    }).populate("User","username");
    res.json({
        content
    })
})

app.post("/api/v1/content", UserMiddleware ,async(req,res)=>{
    const title = req.body.title;
    const link = req.body.link;
    await contentModel.create({
        title,link,
        //@ts-ignore
        userId:req.userId,
        tags: []
    })
    res.json({
        "message": "Content added"
    })
})

app.delete("/api/v1/content", UserMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    const result = await contentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.json({
        message: "Deleted successfully"
    });
});


app.post("/api/v1/brain/share",(req,res)=>{

})

app.post("/api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000)

