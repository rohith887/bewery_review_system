const { default: mongoose } = require('mongoose');
const mangoose=require('mongoose');
const userSchema=new mangoose.Schema({
   name:{type:String,required:true},
   email:{type:String,required:true},
   password:{type:String,required:true},
},{timestamps:true})

const UserModel=mongoose.model("Users",userSchema);
module.exports=UserModel;