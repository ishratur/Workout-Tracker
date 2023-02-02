const express = require('express')
const requireAuth = require('../Middleware/requireAuth')
const {createWorkout,workouts,workout,deleteWorkout,updateWorkout} = require('../Controller/workoutControllers')

const router = express.Router()

// authentication middleware 
router.use(requireAuth)

// GET all workouts
router.get('/',workouts)

// GET single workout
router.get('/:id',workout)

// ADD a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id',deleteWorkout)

// UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports = router