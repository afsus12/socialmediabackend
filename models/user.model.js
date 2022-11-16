const { stringifyId } = require("admin-bro-mongoose/src/resource");
const mongoose=require("mongoose");

const saltRounds = 10;
const {Schema}=mongoose;
const uniqueValidator=require("mongoose-unique-validator");
const userSchema= new Schema({
   email:{
    type: String,
    required:true,

    max:50,
    unique:true,

   },
   first_name: { type: String, default: null },
  last_name: { type: String, default: null },
    username:{
        min:3,
        max:20,
        type:String,required:true,unique:true
    },
    password:{
        type:String,required:true,min:6
    },
    date:{
        type: Date,
        default: Date.now(),
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""

    },
    followers:{
      type:Array,
      default:[]
         
    },
    followins:{
        type:Array,
        default:[]
           
      },
      isAdmin:{
        type:Boolean,
        default:false,
      },
      isVerified:{
        type:Boolean,
        default:false,
      },
      university:{
        type:String,
      
           
      },
      description:{
        type:String,
        max:150,

      },
      city:{
        type:String,
        max:50
      },
      gender:{
       type:String,
       enum:["M","F"]
      },
      from:{
        type:String,
        max:50,
      },
      relationship:{
        type:Number,
        enum:[1,2],
      }    
        
    
},  {timestamps:true}
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

module.exports=mongoose.model("user",userSchema)
