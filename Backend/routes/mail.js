//const Joi = require('joi');
//const filter = require('../middleware/multer');
const auth = require('../middleware/auth').auth;
const Fuse = require('fuse.js')
var FuzzySearch = require('fuzzy-search')
const multer = require('multer');
const path = require('path');
const Mails = require('./../models/mail');
const nodemailer = require('nodemailer')
const smtpTransport= require('nodemailer-smtp-transport');

const express = require('express');
const router = express.Router();
var transporter = nodemailer.createTransport(
  smtpTransport({
    name: "mail.fantisco.com",
    tls: {
      rejectUnauthorized: false,
    },
  })
);

const storage = multer.diskStorage({
    destination: 'uploads/mails/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }

});
 let upload=multer({ storage: storage});//upload.fields([{name:'files',maxCount:2}])

router.post('/', auth,upload.fields([{name:'files',maxCount:2}]),async (req, res) => {
  console.log(req.body);
  var mailOptions = {
    from: req.user.email,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.description,
  };
//console.log(req.body);
  transporter.sendMail(mailOptions,  async (error, info) =>{
    if (error) {
      console.log(error);
      res.json({
        error: true,
        message: error,
      });
    } else {

      let mail = new Mails({
        ...req.body,
        date: Date.now(),
        from: req.user.email,
        files:req.files['files'].map(ele=>{
               return 'uploads/mails/'+ele.filename;
           }),


      });
     console.log(req.body);
      mail = await mail.save();
      if (mail) {
        res.json({
          error: false, data: mail, message: "Email Sent Successfuly"
        });
      } else {
        res.json({
          error: true, message: 'Fail to Send Email'
        });
      }
    }
  });


  // console.log(mail);
});


//single Email

// [innerHtml]=
//single Email
router.get('/single/:id', auth, async (req, res) => {
  let mails = await Mails.findById({ _id: req.params.id });
  if(mails){
    res.json({ error: false, data: mails });

  }else{
    res.json({ error: true, message:"No such email found ." });
  }
});

//recipients email

router.get('/to', auth, async (req, res) => {
  console.log(req.user.email)
  let mails = await Mails.find({ to: req.user.email });
  console.log(mails);
  if(mails){
    res.json({ error: false, data: mails });

  }else{
    res.json({ error: true, message:" No Emails Found" });
  }
});
// sender Email
router.get('/from', auth, async (req, res) => {
 // console.log(req.user.email)
  let mails = await Mails.find({ from: req.user.email});
// console.log(mails)

  if(mails){
    res.json({ error: false, data: mails });

  }else{
    res.json({ error: true, message:" No Emails Found" });
  }
});



//All Emails
router.get('/all', auth, async (req, res) => {
 // console.log(req.user.email)
  let mails = await Mails.find();
// console.log(mails)

  if(mails){
    res.json({ error: false, data: mails });

  }else{
    res.json({ error: true, message:" No Emails Found" });
  }
});
// search email

router.post('/search',async (req, res)=> {
 // console.log(req.body);
  let data = await Mails.find({$or:[{ subject:req.body.search},{to:req.body.search},{from:req.body.search}]});
  if(data){
    res.json({error: false ,data: data});
  }else{
    res.json({error: true ,message:" No Emails Found"});
  }

});

router.post('/searchSubject',auth, async (req, res)=> {
  // console.log(req.body);
   let data = await Mails.find({ from: req.user.email});

   const all_mails=[];

   data.map((res)=>{
      return all_mails.push(res);
   })
   //console.log(all_mails)

  const searcher = new FuzzySearch(all_mails, ['subject'], {
    caseSensitive: true,
  });
  const result = searcher.search(req.body.subject);
  console.log(result);

  if(result ) {
     res.json({error: false ,data: result});
   }else{
     res.json({error: true ,message:" No Emails Found"});
   }


  
 
 });

//delete email
router.delete('/delete/:id', auth, async (req, res) => {
  const mail = await Mails.findByIdAndRemove(req.params.id);

  if (!mail) return res.json({ error: true, message: 'The Email with the given ID was not found.' });

  res.json({ error: false, message: 'Email Succesfuly Deleted' });

});



module.exports = router;