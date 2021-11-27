const Exercise = require('../model/exercise')
const {BadRequestError,UnAuthenticationError} = require('../errors')
const {StatusCodes} = require('http-status-codes')


const getAllExercise = async (req,res) => {
     const {userId,name} = await req.user
                   
      const getAllExercise = await Exercise.find({createdBy:userId}).sort("createdAt")
      
      res.status(StatusCodes.OK).json({getAllExercise,count: (getAllExercise).length})
}

const createExercise = async (req,res) => {

    req.body.createdBy = req.user.userId
    const createExercise = await Exercise.create(req.body)
    if(!createExercise){

        res.status(StatusCodes.NOT_FOUND).json({success:false})
    }
    
    res.status(StatusCodes.CREATED).json({success:true})

     
}

const getsingleExercise = async (req,res) => {

   const {user: {userId}, params:{id: exerciseId}} = req
   
   const exercise = await Exercise.findOne({ _id:exerciseId, createBy:userId})
  if(!exercise){
      throw new NotFoundError(`No task with id : ${exerciseId}`)
  }
  
  res.status(StatusCodes.OK).json({exercise})

}



const deleteExercise = async (req,res) => {
    
    const {user: {userId}, params:{id: exerciseId}} = req
    
    const exercise = await Exercise.findOneAndDelete({ _id:exerciseId, createBy:userId})
    if(!exercise){
      throw new NotFoundError(`No task with id : ${exerciseId}`)
    }
    res.status(StatusCodes.OK).json({success: true})
    
}

const updateExercise = async (req,res) => {
    const {body:{name,duration,time,description,completed},
        user:{userId},               ///neasted destructuring
    params:{id: exerciseId}} = req

    const updateExercise = await Exercise.findOneAndUpdate({_id:exerciseId, 
                                                            createdBy:userId},
                                                            req.body,
                                                            {new:true, runValidators:true}) 
  
     if(!updateExercise){
         res.status(StatusCodes.NOT_FOUND).json({success: false,completed})
         throw new NotFoundErrors(`No task with id : ${exerciseId}`)
     
        }

     res.status(StatusCodes.OK).json({success: true,completed})
}

module.exports = {
    getAllExercise,
    getsingleExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    
}