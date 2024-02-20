import { memberActions } from "@/store/member-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsync } from "./use-async"
import { useHttp } from "./use-http"

export const useAuth = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.member)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [httpRequest, isLoading] = useHttp()
    const { catchAsync } = useAsync()

    const persistAuthentication = catchAsync(async () => {
        if (localStorage.getItem('jwt-token')) {
            const { data } = await httpRequest('/authenticate')
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