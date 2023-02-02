import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch('/api/user/signup',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            setIsLoading(false)

            // save the user to browser local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the authcontex with user data
            dispatch({type: 'LOGIN', payload: json})

        }
    }
    return {signup, isLoading, error}
}