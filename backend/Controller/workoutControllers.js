const Workout = require('../Model/workoutModel')
const mongoose = require('mongoose')

//util - id validation

const isIdValid = (res, id) =>{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'id is invalid'})
    }

}

// GET all workouts
const workouts = async (req,res) =>{
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET single workout
const workout = async (req,res) => {
    const { id } = req.params

    // validate id format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'id is invalid'})
    }

    const workout = await Workout.findById(id)

    // check id not found in the db
    if(!workout){
        return res.status(404).json({message: 'workout not found'})
    }

    res.status(200).json(workout)
}

// ADD a new workout
const createWorkout = async(req, res) =>{

    const {title, load, reps} = req.body
    const user_id = req.user._id

    try {
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

// DELETE a workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params

    // validate id format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'id is invalid'})
    }

    try {
        const workout = await Workout.findByIdAndDelete(id)
        if(!workout){
            throw new Error('invalid workout') 
        }
        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// UPDATE a workout
const updateWorkout = async (req,res) =>{
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'id is invalid'})
    }
    
    try {
        const workout = await Workout.findByIdAndUpdate(id, {...req.body},{new: true})
        if(!workout){
            throw new Error('invalid workout')
        }
        
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
 
module.exports = {createWorkout,workouts,workout,deleteWorkout,updateWorkout}