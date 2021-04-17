const {validate} = require('../models/register');
const {User} = require('../models/register');
const upload = require('../middleware/multer')
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/',upload.single('profile') ,async (req, res) => {
    // res.json({
    //      profile: req.file.filename,
    //     ...req.body,
    //     success: true,
    // })
 
    const { error } = validate({...req.body,image: req.file.filename});
     console.log(error);
    if (error) {

        return res.json({
            error: true,
            message : error.details[0].message,
            status: 400,
        })
       // return res.status(400).send(error.details[0].message);
    }
 
    let user = await User.findOne({ email: req.body.email });
    if (user) {   

        return res.json({
            error: true,
            message : 'That user already exisits!',
            status : 404,
        })
        
       // return res.status(400).send('That user already exisits!');
    } else {
   
       
        let user = new User({
           
            ...req.body,
            image:  'uploads/profile/'+req.file.filename,
        });
       const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.confirm_password = await bcrypt.hash(user.confirm_password, salt);
        await user.save();
        res.json({
            error: false,
            message : " Register Succecfully !",
            status : 200
        });
    }


    
});


 
module.exports = router;