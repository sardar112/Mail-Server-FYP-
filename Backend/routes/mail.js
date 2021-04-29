//const Joi = require('joi');
//const filter = require('../middleware/multer');
const auth = require('../middleware/auth').auth;

const multer = require('multer');
const path = require('path');
const Mails = require('./../models/mail');

const express = require('express');
const router = express.Router();


// const storage = multer.diskStorage({
//     destination: 'uploads/mails/',
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + file.originalname);
//     }
    
// });
//  let upload=multer({ storage: storage});, upload.fields([{name:'files',maxCount:2}])

router.post('/',auth,async (req, res) => {
console.log(req.user);
   

   let mail =  new Mails({
       ...req.body,
       from:req.user.email,
    //    files:req.files['files'].map(ele=>{
    //        return 'uploads/mails/'+ele.filename;
    //    }),
      
     
   });
  console.log(mail);
   mail= await mail.save();
    if(mail){
    res.json({
        error: false, data : mail,message:"Email Sent"
    });
}else{
    res.json({
        error: true, message: 'fail'
    });
}
   // console.log(mail);
});


//single Email

// [innerHtml]=

router.get('/single/:id',auth, async (req, res)=>{
    let mails= await Mails.findById({_id:req.params.id});
   res.json({error: false,data:mails});
});

router.get('/to',auth, async (req, res)=>{
     let mails= await Mails.find({to:req.user.email});
    res.json({error : false, data:mails});
});

router.get('/from',auth, async (req, res)=>{
    let mails= await Mails.find();
   res.json({error: false,data:mails});
});
 
module.exports = router; 