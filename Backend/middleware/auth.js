

const jwt = require('jsonwebtoken');
const config = require('config');


function auth (req, res, next) {


    //const token = req.headers["x-auth-token"]; 
    const token = req.headers.token; 
    //console.log(req.headers.token);

    if(!token) {
     // console.log('Token not found');
      return res.json({ error:true, message: "Acces denied.No token provided."})
    // return   res.status(401).send("Acces denied.No token provided.");
    }
    try{

     const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
     req.user = decoded;
     
     next();


    }catch(ex) {
      res.json({ error:true, message:ex.message });

      //res.status(400).send("Invalid Token!")
    }

}




module.exports.auth= auth;