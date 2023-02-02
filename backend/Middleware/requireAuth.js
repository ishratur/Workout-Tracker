const jwt = require("jsonwebtoken")
const User = require("../Model/userModel")

const requireAuth = async (req, res, next) =>{

    // verify authentication
    const { authorization } = req.headers

    if(!authorization){
       return res.status(401).json({error: 'Authorization token required'}) 
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        // after getting the verified _id
        // finds the user with _id on the db
        // adds user property to the req body so it can be passed to the next()
        // just adding the user _id to the req body insted of the entire user properties
        req.user = await User.findOne({_id}).select('_id')

        // move to the next handler
        // i.e. controller function
        next()
    } catch (error) {
        res.status(401).json({error: 'request is not authorized'})
    }


}

module.exports = requireAuth