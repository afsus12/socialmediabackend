 
const express = require('express');

const   port = process.env.PORT || 4000;
const mongoose=require('mongoose');
const dbconfig=require('./config/db.config');
const auth=require('./middlewares/auth');
const errors=require('./middlewares/errors');
const { unless } = require("express-unless")
const adminRouter=require('./routers/admin.router.js')  

/* const User=require("./models/user.model") */
const    app = express();
mongoose.Promise=global.Promise; 
mongoose.connect(dbconfig.db,
{
 useNewUrlParser:true,
 useUnifiedTopology:true    

}).then(()=>{console.log("connected to db")},(error)=>{
    console.log("not connected to db"+error);
});
auth.authenticateToken.unless= unless;
app.use(auth.authenticateToken.unless
    ({path:[{url:"/users/login",methods:["POST"]},

{url:"/users/register",methods:["POST"]}
]


    })
    
    ); 
    app.use(express.json());
    app.use("/users",require("./routes/users.routes"));
    app.use(errors.errorHandler);
    app.use('/admin',adminRouter)



app.listen(port, () => {
    console.log('Server started on: ' + port);
});


/*

app.get("/",async (req,res )=> {

res.send("hello");

} );
app.post("/",async (req,res )=> {

    res.send("hello");
    
    } );
    app.post("/api/register",async (req,res )=> {
 
        console.log(req.body)
        const {username,password}=req.body
       const password=await bcrypt.hash(password,10) 
      res.json({status:'ok'+req.body["username"]})
      try{
         const response =await User.create(
                { username,password
                }
                )
  
  console.log(response)
  
  
      } catch (error){
          console.log(error)
          return res.json({status:"erorr"})
      }
  
  
          } ); */