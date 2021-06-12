
var mailin = require("mailin");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const forgotPassword = require('./routes/forgotPassword');
const mail = require('./routes/mail');
const getUser = require('./routes/getUser');
const Mails= require('./models/mail');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require('hpp');
const xss = require("xss-clean");
const bodyParser=require("body-parser")
const express = require('express');  
const fs = require('fs');

const app = express();


// database
mongoose.connect('mongodb+srv://test:test123@cluster0.b0gq8.mongodb.net/emailServer?retryWrites=true&w=majority',
{useNewUrlParser: true,useUnifiedTopology: true ,  useFindAndModify: false,
})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

// mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true,useUnifiedTopology: true,    useCreateIndex: true,} ) 
// .then(()=> console.log("succesfully connected"))
// .catch(err=>console.error("failed to connect"));










// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false ,limit: '100mb',}));

// parse application/json
app.use(bodyParser.json({limit: '100mb',}));




require('dotenv').config({path:'config/.env'});

app.use(helmet());
app.use(cors());
app.use(hpp()); 
// app.use (express.urlencoded({extended: false,limit: '100mb',  }));
// app.use(express.json({limit: '100mb', }));             


app.use(morgan("dev"));

app.use('/uploads',
  express.static(__dirname + '/uploads'));



  app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/mail', mail);
app.use('/api/getuser', getUser);


//not found
app.use('**',(req,res)=>{
  res.send("Page Not Found !")
})

app.listen(3000, () => {
  console.log("server started http://162.243.166.89:3000");
});





/// incomming emails ............

mailin.start({
  port: 5000,
  disableWebhook: true, // Disable the webhook posting.
});

mailin.on("message", async (connection, data, content)=>{
  let files=[];
  for(let attachment of data.attachments){
    try{
    let fileName=`${Date.now()}-${attachment.fileName}`
    fs.writeFileSync(`./uploads/mails/${fileName}`,attachment.content);
    files.push(fileName);
    }catch(err){
      console.log(err);
    }
  }
  let mail = new Mails({
  to: data.headers.to,
  from: data.headers.from.split("<")[1].slice(0,-1),
  user_name: data.headers.from.split("<")[0],
  subject: data.headers.subject,
  description: data.headers.description,
  date: data.headers.date,
  files
  });

  mail = await mail.save();
  // console.log(mail);

});




