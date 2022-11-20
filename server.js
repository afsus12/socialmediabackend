 
const express = require('express');

const   port = process.env.PORT || 4000;
const mongoose=require('mongoose');
const dbconfig=require('./config/db.config');
const auth=require('./middlewares/auth');
const errors=require('./middlewares/errors');

const adminRouter=require('./routes/admin.routes.js')  
const logger = require('morgan');

const users = require('./routes/users.routes');
const posts = require('./routes/post.routes');
const messages= require('./routes/message.routes');
const conversations = require('./routes/conversation.routes');
const authentification=require('./routes/authen.routes') 
/* const User=require("./models/user.model") */
const    app = express();
mongoose.Promise=global.Promise; 
mongoose.connect(dbconfig.db,
{
 useNewUrlParser:true,
 useUnifiedTopology:true    

}).then(()=>{console.log("connected to db")},(error)=>{
    console.log("not connected to db"+error);});
    app.use(logger('dev'));
    app.use(express.json());
//public routes
app.use('/admin',adminRouter)
app.use('/authen', authentification);
app.use('/posts',posts);
app.use('/messages',messages);
app.use('/conversation',conversations);
app.use('/users',users);
//private routes
/* app.use('/users',auth.authenticateToken ,users); */


    app.use(express.json());
    app.use("/users",require("./routes/users.routes"));
    app.use(errors.errorHandler);




app.listen(port, () => {
    console.log('Server started on: ' + port);
});


