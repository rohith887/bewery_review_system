const { default: mongoose } = require('mongoose');
const mangoose=require('mongoose');
const ratingSchema=new mangoose.Schema({
  user_id:String,
   rating:Number,
   review:String
},{timestamps:true})

const ratingModel=mongoose.model("Rating",ratingSchema);
module.exports=ratingModel;