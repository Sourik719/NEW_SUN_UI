import { useState } from "react";
import { useSelector } from "react-redux";

const domain = 'http://localhost:5000'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useSelector(state => state.user)
    const httpRequest = async (url, method = 'GET', body = null) => {
        setIsLoading(true)
        const res = await fetch(`${domain}${url}`, {
            method, body: body ? JSON.stringify(body) : null,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        const { success, message, data } = await res.json()
        setIsLoading(false)
        if (!success) throw new Error(message)
        return data
    }
    return [httpRequest, isLoading]
}