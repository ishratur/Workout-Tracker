import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        
        const json = await response.json()
        

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            setIsLoading(false)

            // save the user to the local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the authcontex
            dispatch({type: 'LOGIN', payload: json})
        }

    }

    return {login, isLoading, error}
}