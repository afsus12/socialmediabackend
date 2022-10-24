const mongoose=require("mongoose");
const {Schema}=mongoose;
const uniqueValidator=require("mongoose-unique-validator");
const userSchema= new Schema({
   email:{
    type: String,
    required:true,
    unique:true,

   },
    username:{
        type:String,required:true
    },
    password:{
        type:String,required:true,unique:true
    },
    date:{
        type: Date,
        default: Date.now(),
    }
},
)
userSchema.set("toJSON",{
transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id.toString(),
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
},

});
userSchema.plugin(uniqueValidator,{message:"Email already in user."}); 
const User=mongoose.model("user",userSchema)
module.exports=User;