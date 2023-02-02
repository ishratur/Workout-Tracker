require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')


// create the express app
const app = express()

// Middleware to log the server request
app.use((req,res,next) =>{
    console.log(req.path, req.method)
    next()
})

// attach data to req body
app.use(express.json())

// Routes - passes all the request to workoutRoutes
app.use('/api/workouts', workoutRoutes)

// Routes - passes all the request to userRoutes
app.use('/api/user',userRoutes)

// connect to mongoDB
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listen on a port
    app.listen(process.env.PORT,() =>{
        console.log(`listening on port ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log(error)
})


