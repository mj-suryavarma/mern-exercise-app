const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err, req,res, next) =>{

   /// default error 
    const customError ={
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong please try again"
    }

///// dublicate value error
    if(err.code && err.code === 11000){
        customError.msg  = `dublicate value for ${Object.keys(err.keyValue)} fields, please choose another value.`
        customError.statusCode= 400

    }
    ////cast error
    if(err.name ==='CastError'){
        customError.msg = `No item find with id : ${err.value}`
        customError.statusCode =404
    }
     
    res.status(customError.statusCode).json({msg: customError.msg})
    next()
}

module.exports = errorHandlerMiddleware;