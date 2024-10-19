const jwt = require("jsonwebtoken");

function verify(req,res,next){
    const authHeader=req.headers.token;
    if(authHeader){
        const token=authHeader;
        jwt.verify(token,'lama',(err,user)=>{
            if(err) 
            {
                console.log(token);
                res.status(403).json("token is not valid!");
            }
            else
            {
                req.user=user;
                next();
            }
        })
    }else{
        return res.status(401).json("You are not authenticated!")
    }
}

module.exports=verify;