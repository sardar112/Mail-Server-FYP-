const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Mails=mongoose.model("Mails",new mongoose.Schema({
    
    to: {
        type:String,
        required : true,
      //  lowercase: true,
    },
    from:{
        type : String,
       // lowercase: true,
    },
    user_name: {type:String},
    subject: {
        type:String,


    },
    description:{
        type:String,

    },
    date:{
        type:Date,

    },

    files: {
        type:[String],

    }

    
    }));


module.exports = Mails;