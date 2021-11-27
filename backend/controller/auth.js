const User = require('../model/user');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,UnAuthenticationError} = require('../errors')

const jwt = require('jsonwebtoken')


const Register = async (req,res) => {
   //// store user register infor on db
    const user = await User.create({...req.body})
    /// call the creat token from db method
    const token = user.createJwt()
    res.status(StatusCodes.CREATED).json({user : {name : user.name},token})
    //   res.send("resgistered")
}


const Login = async (req,res) =>{

     const {email, password} = req.body
     
     /// validation 
     if(!email || !password ){
         throw new BadRequestError("please provide email and password")
     }
    /// find user in db
    const user = await User.findOne({email})
    if(!user){
        throw new UnAuthenticationError("Invalid Credentials")
    }
  
    //// compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnAuthenticationError("password Invalid Credentials")
    }
      const token = user.createJwt()
    res.status(StatusCodes.OK).json({user: {name: user.name},token})
     
    }



module.exports = {
    Login,
    Register,
}