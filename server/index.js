const express=require('express')
const mongoose=require( 'mongoose');
const projectModel=require('./models/Project')
const app=express()
const cors = require('cors');
app.use(express.json());
app.use(cors({ 
    origin: ["http://localhost:3003","https://portfolio-client-n2qa.onrender.com/"]
    credentials: true
}));
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));
app.get("/test",(req,res)=>{
    res.json("okay test")
})
app.get("/project",async (req,res)=>{
    try {
        const allProject= await projectModel.find({})
        if(allProject){
            return res.json(allProject)
        }
        else{
            return res.json("No project found")
        }
    } catch (error) {
        
    }
})
app.delete("/delete/:id", async (req,res)=> {
   let id = req.params.id;
   const deleteDoc = await projectModel.findByIdAndDelete(id)
   if(!deleteDoc) return res.status(404).json("No record found with given ID");
   res.json(deleteDoc);
});

app.post("/savenewproject",async (req,res)=>{
    const {title,description,techstack,link}=req.body;
    console.log("body",req.body)
    try {
        const projectDoc=await projectModel.create({title,description,techstack,link})
        if(projectDoc){
            return res.json({projectDoc});
        }
    } catch (error) {
        
    }
})
app.listen(process.env.PORT,()=>{
    console.log("server is running on port 4004");
})
