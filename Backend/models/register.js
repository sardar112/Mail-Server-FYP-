const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
  first_name: {
        type: String,
        required: [true,"First Name is required"],
        minlength: [3,"Minimum Length is 3 characters"],
        maxlength: [25,"Maximum Length is 25 characters"]
    },
   last_name: {
        type: String,
        required: [true,"First Name is required"],
        minlength: [3,"Minimum Length is 3 characters"],
        maxlength: [25,"Maximum Length is 25 characters"]
    },
    email: {
        type: String,
        required:  [true,"Email is required"],
        match :[
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please Enter Valid Email"
        ],
        unique : true,
        lowercase: true,
      
        
    },
    recovery_email: {
        type: String,
        required:  [true, "Recovery Email is required"],
        lowercase: true,
        pattern :[
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please Enter Valid Email",
        ],
        
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6,"Minimum Length is 6 characters"],
        maxlength: [255,"Maximum Length is 255 characters"]
    },
  confirm_password: {
        type: String,
        required: [true," confirm Password Password is required"],
        minlength: [6,"Minimum Length is 6 characters"],
        maxlength: [255,"Maximum Length is 255 characters"],
        
    },
    phone_number: {
        type: String,
        required: [true,"Phone Number is required"],
        minlength: [11,"Minimum Length is 6 characters"],
        maxlength: [15,"Maximum Length is 255 characters"],
        
        
    },
  

    city: {
         type : String,
        required: true,
       
    },
    gender: {
        type : String,
        required: true,
       
    },

    image : {
        type : String,
        required : [true,"Profile Picture Required"]
      }

   
  

}));





 function validateUser(user) {
    const schema = Joi.object({
       first_name: Joi.string().min(3).max(25).required().alphanum(),
        last_name: Joi.string().min(3).max(25).required().alphanum(),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        recovery_email: Joi.string().required().email(),
        password: Joi.string().min(6).max(255).required(),
        confirm_password: Joi.ref('password'),
        phone_number: Joi.string().min(11).max(20).required(),
        city: Joi.string().required(),
        gender: Joi.string().required(),
        image: Joi.string().required(),

    });
  return  schema.validate(user);
    
}


module.exports = {User,validate:validateUser};