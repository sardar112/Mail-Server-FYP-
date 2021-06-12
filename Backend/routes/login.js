const config = require('config')
const jwt = require('jsonwebtoken');
const User = require('../models/register').User;
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const auth = require('../middleware/auth').auth;


const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
   
    const { error } = validate(req.body);
   // console.log(req.body);
    if (error) {

return res.json({
    error: true,
    message : error.details[0].message
     });
       // return res.status(400).send(error.details[0].message);
    }
 
 
    let user = await User.findOne({ email: req.body.email });

    if (!user) {

        //return res.status(400).send('Incorrect email or password.');
        return res.json({ error : true, message : "Incorrect email or password."});
    }
 
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {

        //return res.status(400).send('Incorrect email or password.');
        return res.json({error: true, message : "Incorrect  password."})

    }

   // const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    
    const token = jwt.sign({ _id: user._id,email:user.email }, process.env.PRIVATE_KEY);
  //  console.log(token);

   // res.header('x-auth-token', token).send(_.pick(user, ['id','first_name','last_name','email']));
    res.json({
        error: false,
      //  'token': token,
      message : "Login Successfuly.",
        data:token
    })
 
 
    
});


// router.get('/me',  (async(req, res) => {
//     const id = req.user._id;
//     let user = await User.findOne({
//         _id: id
// });
//     if (!user) {
//         return res.json({ 
//             error : true,
//             message: " Not found"
//         });
//     }

//     res.json({ error:false, data:user});
// }));


 


function validate(user) {
    const schema = Joi.object({

      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(6).max(255).required(),
      

    });
  return  schema.validate(user);
    
}

 
module.exports = router; 