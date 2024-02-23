import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsync } from "./use-async"
import { useHttp } from "./use-http"
import { memberActions } from "@/store/member-slice"

export const useAuth = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.member)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [httpRequest, isLoading] = useHttp()
    const { catchAsync } = useAsync()

    const persistAuthentication = catchAsync(async () => {
        const savedToken = localStorage.getItem('jwt-token')
        if (savedToken) {
            const { data } = await httpRequest('/authenticate')
            dispatch(memberActions.setToken(savedToken))
            dispatch(memberActions.setMember(data.member))
            setIsAuthenticated(true)
        } else {
            dispatch(memberActions.clearMember())
            setIsAuthenticated(false)
        }
    })

    useEffect(() => {
        persistAuthentication()
    }, [token])

    return [isAuthenticated, isLoading]
}