const jwt=require("jsonwebtoken");

function authenticateToken(req,res,next){
const authHeader=req.headers["authorization"];
const token = authHeader && authHeader.split(" ")[1];
if(token == null) return res.sendStatus(401);
jwt.verify(token,"Social_MediaKey",(err,user)=>{
if(err) return res.sendStatus(403);
req.user=user;
next();
});
}
function validateUser(req, res, next) {
    jwt.verify(token,"Social_MediaKey", function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }
function generateAccessToken(username,isAdmin,id){
return jwt.sign({username:username,isAdmin:isAdmin,id:id},"Social_MediaKey",{

    expiresIn:"1d",

});
}
module.exports={
    validateUser,
    authenticateToken,
    generateAccessToken,
};