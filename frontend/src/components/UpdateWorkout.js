import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const UpdateWorkout = ({workout}) => {
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load)
    const [reps, setReps] = useState(workout.reps)

    const [error, setError] = useState(null)
    
    const {dispatch} = useWorkoutContext()
    const { user } = useAuthContext()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const workoutModified = {title,load,reps}

        const response = await fetch(`api/workouts/${workout._id}`,{
            method: 'PATCH',
            body: JSON.stringify(workoutModified),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle(json.title)
            setLoad(json.load)
            setReps(json.reps)
            setError(null)
            dispatch({type: 'UPDATE_WORKOUT', payload: json})
        }

    }


    return (
        <form onSubmit={handleSubmit} className="create">
            <h3>Update Workout</h3>

            <label >Exercise title</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
            />

            <label >Load in (kg)</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label >Reps</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button >Modify Workout</button>
            {error && <div className="error">{error}</div>}       

        </form> 

     );
}
 
export default UpdateWorkout;