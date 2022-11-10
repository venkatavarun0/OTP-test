const bcrypt = require('bcrypt');
 const _ =require('lodash');
 const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const User=require("../models/usermodel");
const Otp=require("../models/otpmodel");

module.exports.signUp=async(req,res)=>{
    const user=await Otp.findOne({
        number:req.body.number
    });
    if(user) return res.status(400).send("user already registered");
    const OTP=otpGenerator.generate(6,{
        digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
    });
    const number=req.body.number;
    console.log(OTP);
    const otp=new Otp({number:number,otp:OTP});
    const salt=await bcrypt.genSalt(10)
    otp.otp=await bcrypt.hash(otp.otp,salt);
    const result=await otp.save();
    return res.status(200).send("otp send successfully")

}
module.exports.verifyOtp=async(req,res)=>{
    const otpHolder=await Otp.find({
        number:req.body.number
    });
    if(otpHolder.length===0)return res.status(400).send("you use an expiredotp!");
    const rightOtpFind=otpHolder[otpHolder.length-1];
    const validUser=await bcrypt.compare(req.body.otp,rightOtpFind.otp);
    if(rightOtpFind.number===req.body.number && validUser){
        const user=new User(_.pick(req.body,["number"]));
        const token=user.generateJWT();
        const result=await user.save();
        const OTPDelete=await Otp.deleteMany
        ({
            number:req.body.number
        });
        return res.status(200).send({
            message:"User register successfully",
            token:token,
            data:result ,
        })
       
    } else {
        return res.status(400).send("otp was wrong")
    }
}


