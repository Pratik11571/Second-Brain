import express from "express";
import {UserModel,contentModel,linkModel} from "./db";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { secret } from "./pass";
import { UserMiddleware } from "./middleware";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

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
    const userId = req.userId;
    const content = await contentModel.find({
        userId
    }).populate("userId","username");
    res.json({
        content
    })
})

app.post("/api/v1/content", UserMiddleware ,async(req,res)=>{
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    await contentModel.create({
        title,link,type,
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
        userId: req.userId
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.json({
        message: "Deleted successfully"
    });
});


app.post("/api/v1/brain/share", UserMiddleware ,async (req,res)=>{
    let share = req.body.share;
    let hash = random(10);
    if (share) {// if shared by user
        //1.Check if already shared
        const existingLink = await linkModel.findOne({
            userId: req.userId
        })

        if(existingLink) {// if shared already then return existing link
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        //if not shared already then create return new link
        await linkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            message: "/api/v1/brain/" + hash
        })
    }

    else{//if not shared delete current link
        await linkModel.deleteOne({
            userId: req.userId
        })

        res.json({
            message: "Removed Link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async(req,res)=>{
    let hash = req.params.shareLink;
    let link = await linkModel.findOne({
        hash: hash
    })

    if(!link) {
        res.status(411).json({
            message: "Sorry Incorrect input"
        })
        return;
    }

    let content = await contentModel.find({
        userId: link.userId
    })

    res.json({
        message: content
    })
})

app.listen(3000)

