import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"

export const useWorkoutContext = () =>{
    const context = useContext(WorkoutContext)

    // Checking the context is not null
    // If the context is called from a different scope then it will return null
    // Here, the scope is root app component
    // But, if the scope is some othe components 
    // down the tree then it will return null for out of scope component
    if(context) return context  
    
    else throw Error('useWorkoutContext called from out of scope') 
}