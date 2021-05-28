const mongoose = require('mongoose');
const Mails=mongoose.model("Mails",new mongoose.Schema({
    
    to: {
        type:String,
      //  required : true,
      //  lowercase: true,
    },
    from:{
        type : String,
       // lowercase: true,
    },
    // user_first_name{

    // }
    subject: {
        type:String,


    },
    description:{
        type:String,

    },

    files: {
        type:[String],

    }

    
    }));
module.exports = Mails;