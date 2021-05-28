
const User = require('../models/register').User;
//const validate = require('../models/register').validate;
const bcrypt = require('bcrypt');
const Joi = require('joi');
const auth = require('../middleware/auth').auth;

const express = require('express');
const router = express.Router();



router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.json({ error: true, message: "The user with the given ID was not found." });

  res.json({ error: false, data: user });
});


router.put('/edit', auth, async (req, res) => {

  const { error } = validate(req.body);

  if (error) {

    return res.json({
      error: true,
      message: error.details[0].message
    });
    // return res.status(400).send(error.details[0].message);
  }

  let user = await User.findByIdAndUpdate({ _id: req.user._id });

  if (!user) return user.json({ error: true, message: 'The user with the given id is not available' });

  // return res.status(404).send('the user with the given id is not available');


  else {

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.recovery_email = req.body.recovery_email;
    user.phone_number = req.body.phone_number;
    user.city = req.body.city;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.confirm_password = await bcrypt.hash(req.body.confirm_password, salt);



  }
  await user.save();
  res.json({ error: false, message: 'Succesfuly Updated!' });
});


router.delete('/', auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.user._id);

  if (!user) return res.json({ error: true, message: 'The User with the given ID was not found.' });

  res.json({ error: false, message: 'Succesfuly Deleted!' });

});



function validate(user) {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(25).required().alphanum(),
    last_name: Joi.string().min(3).max(25).required().alphanum(),
    recovery_email: Joi.string().required().email(),
    password: Joi.string().min(6).max(255).required(),
    confirm_password: Joi.ref('password', 'Password And Confirm Should Match'),
    phone_number: Joi.string().min(11).max(20).required(),
    city: Joi.string().required(),
    gender: Joi.string().required()

  });
  return schema.validate(user);

}
module.exports = router; 


