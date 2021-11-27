const jwt = require('jsonwebtoken')
const {UnAuthenticationError} = require('../errors')
require('dotenv').config()

const auth = (req,res,next) =>{

      const authHeader = req.headers.authorization
      
      if(!authHeader || !authHeader.startsWith("Bearer ")){
          throw new UnAuthenticationError("Authontication invalid")
      }
      const token = authHeader.split(" ")[1]

               //// verification for login     
      try{
       const payload = jwt.verify(token, process.env.JWT_SECRET)
        
       /// attach user exercise route
       req.user = {userId: payload.userId, name: payload.name}
      }catch(err){
         throw new UnAuthenticationError("No Access Allowed Authentication invalid")
      }
      next()
}

module.exports = auth