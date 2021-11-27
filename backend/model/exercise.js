const mongoose = require('mongoose');


const exerciseShema = new mongoose.Schema({
   name :{ type:String, 
      requried:[ true, "plase provide exercise task name"]},
   description :{ type:String, 
      requried: [true, "plase descripte about your workout"]},
   duration :{ type:String,
       requried: [true,"plase provide workout time"]},
   time :{ type:String,
       requried: [true, "plase provide date"]},
    createdBy: {
       type: mongoose.Types.ObjectId,
       ref:'user',
       required:[true, "please provide user"]
    },
    completed : {
       type : Boolean,
    },

},{timestamps: true})

module.exports = mongoose.model("Exercise",exerciseShema);