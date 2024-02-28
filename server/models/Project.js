const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const projectSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String},
    techstack:{type:String},
    link:String
});
const projectModel=mongoose.model("Project",projectSchema);
module.exports=projectModel;