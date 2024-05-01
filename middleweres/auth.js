const jwt = require("jsonwebtoken")
require("dotenv").config();

async function auth(req, res, next) {
    try {
         let token = req.headers[`authorization`].split(" ")[1];
         if(!token) return res.status(400).send({message:`token not found`});

         let decoded = jwt.verify(token, process.env.SECRET_KEY);
         if(!decoded) return res.status(400).send({message:`token not found`});
         console.log(decoded.user._id);
         req.body.userID = decoded.user._id;
        //  req.body.createdBy = decoded.user.name
         next()
        
     } catch (error) {
        res.status(400).send({message : `/auth --> Token Error`})
     }
}

module.exports = auth