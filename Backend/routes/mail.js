const Joi = require('joi');
//const filter = require('../middleware/multer');
const auth = require('../middleware/auth').auth;

const multer = require('multer');
const path = require('path');

const express = require('express');
const { date } = require('joi');
const router = express.Router();


// const storage = multer.diskStorage({
//     destination: 'uploads/profile/',
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
    
// });


router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //  let upload = multer({ storage: storage, fileFilter: filter.imageFilter }).array('mailImages', 10);

    // await  upload(req, res, function(err) {
    //     if (req.fileValidationError) {
    //         return res.send(req.fileValidationError);
    //     }
    //     else if (!req.file) {
    //         return res.send('Please select an image to upload');
    //     }
    //     else if (err instanceof multer.MulterError) {
    //         return res.send(err);
    //     }
    //     else if (err) {
    //         return res.send(err);
    //     }

    //     let result = "You have uploaded these images: <hr />";
    //     const files = req.files;
    //     // let index, len;

    //     // for (index = 0, len = files.length; index < len; ++index) {
    //     //     result += `"${files[index].path}"`;
    //     // }
        
    //     // res.send("success");
    // });

   let mails = {
       recipient: req.body.recipient,
       subject: req.body.subject,
       content: req.body.content
     
     
   }
   if(mails){
       res.json({error:false , data : mails})

       console.log(mails);
   }else{
       res.json({error:true,message: "Error mail cant send"})
   }
   
    
});




function validate(mail) {
    const mails = Joi.object({

     to: Joi.string().email().required(),
        subject: Joi.string().min(5).max(255),
        content: Joi.string().min(5).max(1024),
      
    
        
      

    });
  return  mails.validate(mail);
    
}

 
module.exports = router; 