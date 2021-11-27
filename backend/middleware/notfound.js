const NotFound = (req,res, next) =>{
    res.status(200).send("Router doesn't exist.")
   next()
}

module.exports = NotFound;