const path = require('path')
require('express-async-errors');
require('dotenv').config({ path: 'ENV_FILENAME' });
const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//// security
const cors = require('cors')
app.use(cors())
app.options(cors())

//// middleware   import
const NotFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const authenticationMiddleware = require('./middleware/authentication')
//// db
const connectDB = require('./db/connect');
///// routes import 
const userRoute = require('./routes/auth')
const exerciseRoute = require('./routes/exercise')  

/// static file
app.use(express.static(path.resolve(__dirname,'../client/build')))
const port = process.env.PORT || 5000


//// routes
app.use('/api/v1/auth',userRoute);

app.use('/api/v1/exercise',authenticationMiddleware,exerciseRoute);  



if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('../client/build'));
}


/// default route
app.get('/api',(req,res) => res.json({msg: "hello world from backend"}))


app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

// use middleware
app.use(NotFound)
app.use(errorHandlerMiddleware)




const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`server listening the port no : ${port}`)
            
      })
  }catch(err){
      console.log(err)
  }
}
 
start();
//// npm run start
