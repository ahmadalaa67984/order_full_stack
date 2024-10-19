const router=require("express").Router();
const User =require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");

//REGISTER


router.post("/register",async(req,res)=>{
    const newUser=new User({
        username: req.body.username,
        email: req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,"lama").toString()
    });
    try{
        const user=await newUser.save();
        res.status(201).json(user);
    }catch(err)
    {
        res.status(500).json(err)
    }
})
//LOGIN

router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user)
        {
            var bytes  = CryptoJS.AES.decrypt(user.password, "lama");
            var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            if(originalPassword !== req.body.password)
            {
                res.status(401).json("wrong password or username!");
            }
            else
            {
                const accessToken=jwt.sign(
                    {id:user._id,isAdmin:user.isAdmin},
                    'lama',
                    {expiresIn:"5d"}
                )
                const {password,...info}=user._doc;
                res.json({...info,accessToken});
            }
        }
        else
        {
            res.status(401).json("wrong password or username!");
        }
        //!user && res.status(401).json("wrong password or username!");
        //var bytes  = CryptoJS.AES.decrypt(user.password, 'lama');
        //var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        //originalPassword !== req.body.password && res.status(401).json("wrong password or username!");

        
    }catch(err)
    {
        res.status(500).json(err)
    }
})
module.exports=router;