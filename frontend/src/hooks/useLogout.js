import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const { dispatch : workoutDispatch} = useWorkoutContext()

    const logout = () => {
        
        // remove user from browser local storage
        localStorage.removeItem('user')

        // update the authcontex
        dispatch({type: 'LOGOUT'})

        // clear the global workout context i.e. clear all the data after logout
        workoutDispatch({type: 'SET_WORKOUTS', payload: null})

    }


    return{logout}
}