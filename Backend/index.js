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


// 
mongoose.connect('mongodb+srv://test:test123@cluster0.b0gq8.mongodb.net/emailServer?retryWrites=true&w=majority',
{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true,useUnifiedTopology: true,    useCreateIndex: true,} ) 
// .then(()=> console.log("succesfully connected"))
// .catch(err=>console.error("failed to connect"));


// envoironment variables

require('dotenv').config({path:'config/.env'});

//....middlewares.......     

 app.use(helmet());
app.use(cors());
app.use(hpp()); 
app.use (bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());             


app.use(morgan("dev"));

app.use('/uploads',
  express.static(__dirname + '/uploads'));

//...........Routes.......'

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





// mailin.start({
//   port: 3002,
//   disableWebhook: true, // Disable the webhook posting.
// });

// mailin.on("message", async (connection, data, content)=>{
//   //console.log("Data", data);
//   let mail = new Mails({
//   to: data.headers.to,
//   from: data.headers.from.split("<")[1].slice(0,-1),
//   user_name: data.headers.from.split("<")[0],
//   subject: data.headers.subject,
//   description: data.headers.description,
//   date: data.headers.date,
//   //files: data.files

//   });

//   mail = await mail.save();
//   console.log(mail);

// });

