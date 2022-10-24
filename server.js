const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const    app = express();
const   port = process.env.PORT || 4000;
const mongoose=require('mongoose');
const dbconfig=require('./config/db.config');
const auth=require('./middlewares/auth');
const errors=require('./middlewares/errors');

const User=require("./models/users")
mongoose.Promise=global.Promise; 
mongoose.connect(dbconfig.db,
{
 useNewUrlParser:true,
 useUnifiedTopology:true

}).then(()=>{console.log("connected to db")},(error)=>{
    console.log("not connected to db"+error);
});
app.use(bodyParser.json());
app.get("/",async (req,res )=> {

res.send("hello");

} );
app.post("/",async (req,res )=> {

    res.send("hello");
    
    } );
    app.post("/api/register",async (req,res )=> {
 
        console.log(req.body)
        const {username,password}=req.body
      /*   const password=await bcrypt.hash(password,10) */
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


        } );


app.listen(port, () => {
    console.log('Server started on: ' + port);
});