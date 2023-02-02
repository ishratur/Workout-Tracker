import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [disableBtn, setDisableBtn] = useState(true)
    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!user){
            return setError('You must login')
        }

        const workout = {title,load,reps}

        const response = await fetch('api/workouts/',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setDisableBtn(true)
            dispatch({type: 'CREATE_WORKOUT', payload: json})

        }

    }

    // disables submit button if all the fields are not entered
    useEffect(() =>{
        if(title && reps && load){
            setDisableBtn(false)
        }
        else{
            setDisableBtn(true)
        }

    },[title,reps,load])

    return (
        <form onSubmit={handleSubmit} className="create">
            <h3>Add a new workout</h3>

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

            <button disabled={disableBtn} >Add workout</button>
            {error && <div className="error">{error}</div>}       

        </form> 

     );
}
 
export default WorkoutForm;