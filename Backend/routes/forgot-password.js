const config = require('config')
const jwt = require('jsonwebtoken');
const User = require('../models/register').User;
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const nodemailer = require('nodemailer');



const express = require('express');
const router = express.Router();

router.post('/', (async(req, res) => {
    const { error } = validateEmail(req.body);
    if (error) {
        return res.json({
            error: true,
            message :error.details[0].message
        })
    
     //   return res.status(400).send(error.details[0].message);
    }
 

    let user = await User.findOne({
        recovery_email: req.body.recovery_email,
     
    });

    

    if (!user) {
        return res.json({
            error: true,
            message : "Invalid enmail "
        })
       // return res.status(404).send("No Such User with this Email ");
    }

     const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY,{ expiresIn: '1h' });
   

    
     const resetUrl=`<p> <a href="http://localhost:4200/reset-password/${token}">Click here to reset your password</a> </p>`

    const message = `you are recieving this email because  (or someone else) has reuqested the reset of the password.
    Please click on this link To reset your Password To :\n\n ${resetUrl}`+'\n\n'+
    'If you did not request this, please ignore this email and your password will remain unchanged';
    



    let transporter=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL,
            pass:process.env.PASSWORD,
       
        }
      });

      var mailOptions = {
     from:process.env.EMAIL,
      to: `${user.recovery_email}`,
      subject: 'Password Reset',
       html : message,

      }

      transporter.sendMail(mailOptions, (err, info) => {

        if(err) {
        

          //  return res.json(  {error : true , message : err.toString()});
            console.log(err);
        }else{
            console.log(info.response);
           // return res.json(  {error : false , message : info.response.toString()});
        }


      });
   
  
      
   
    res.json({ error: false,message: "Link has been sent to your recovery email for reset passwword! check your Email in Spam" });
    
}));

   

//RESET PASSWORD.........
router.put('/:token',(async(req, res) => {
    if (!req.params.token) {
        return res.json({ error: true ,message:"No Token Provided"});
       // return res.status(400).send("NOT TOKEN PROVIDED");
    }
try{
    const decoded = await jwt.verify(req.params.token, process.env.PRIVATE_KEY);
    req.user = decoded;
   // console.log(decoded)
    // const id = req.user._id;
    // console.log(id);
}catch(err){ res.json({ error: true,message:err})}
 
    let user = await User.findOne({ _id : req.user._id}
       
    );
    if (!user) {
        return res.json({error:true,message: "Invalid Token"});
        //return res.status(400).send("INVALID TOKEN");
    }
    else{
        
    const { error } = validatePassword(req.body);
    if (error) {
        return res.json({
            error: true,
            message :error.details[0].message
        })
    
     //   return res.status(400).send(error.details[0].message);
    }



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedConfirmPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    user.confirm_password = hashedConfirmPassword;
 
    await user.save();

    res.json({ error: false,message :"Succesfully Updated Password" ,data: user})
}
  //  res.jsonstatus(200).send("succes");

}));






function validateEmail(email) {
    const schema = Joi.object({   
      recovery_email: Joi.string().required().email(),
    
});
    
    const result = schema.validate(email);
    return result;
}

function validatePassword(password) {
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required(),
        confirm_password: Joi.ref('password'),
      

    });
  return  schema.validate(password);
    
}


module.exports = router; 