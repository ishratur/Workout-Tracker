import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import UpdateWorkout from "./UpdateWorkout"

const WorkoutDetail = ({workout}) => {

    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext()
    const [isUpdate, setIsUpdate] = useState(false)

    const handleDelete = async () =>{
        const response = await fetch(`api/workouts/${workout._id}`,{
            method: 'DELETE',
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json)

        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    const toggleIsUpdate = () =>{
        setIsUpdate((prev) => !prev)

    }

    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>Delete</span>
            <button onClick={toggleIsUpdate}>Update Workout</button>
            {isUpdate && <UpdateWorkout workout={workout}/>}
        </div>
     );
}
 
export default WorkoutDetail;