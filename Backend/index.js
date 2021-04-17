const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const forgotPassword = require('./routes/forgot-Password');
const mail = require('./routes/mail');
const getUser = require('./routes/getUser');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require('hpp');
const xss = require("xss-clean");
const bodyParser=require("body-parser")
const express = require('express');  

const app = express();


 
// mongoose.connect('mongodb+srv://Mail:mailserver@cluster0.sanfx.mongodb.net/<dbname>?retryWrites=true&w=majority',
// {useNewUrlParser: true,useUnifiedTopology: true})
//     .then(() => console.log('Now connected to MongoDB!'))
//     .catch(err => console.error('Something went wrong', err));

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true,useUnifiedTopology: true,    useCreateIndex: true,} ) 
.then(()=> console.log("succesfully connected"))
.catch(err=>console.error("failed to connect"));


// envoironment variables

require('dotenv').config({path:'config/.env'});

//....middlewares.......     

 app.use(helmet());
app.use(cors());
app.use(hpp()); 
app.use (bodyParser.urlencoded({limit:"50mb", extended: true }));
app.use(bodyParser.json({limit:"50mb", extended: true }));             


app.use(morgan("dev"));

app.use('/uploads/profile',
  express.static(__dirname + '/uploads/profile'));

//...........Routes.......'
const mails = [
  {
      title : "mail 1",
    
     sender : "No Reply",
     description : "thi is the 1st mail"
  },

  {title : "mail 2",

  sender : "Ali Khan",
  description : "thi is the 2nd mail"
}

];


app.get('/api/mails', (req,res)=>{
  res.send(mails);

});

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/forgot-password', forgotPassword);
app.use('/api/mail', mail);
app.use('/api/getuser', getUser);


//not found
app.use('**',(req,res)=>{
  res.send("Page Not Found !")
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));