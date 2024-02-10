import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHttp } from "./use-http"
import { useAsync } from "./use-async"
import { memberActions } from "@/store/member-slice"

export const useAuth = () => {
    const dispatch = useDispatch()
    const { member: hasMember } = useSelector(state => state.member)
    const [isAuthenticated, setIsAuthenticated] = useState(hasMember)
    const [httpRequest, isLoading] = useHttp()
    const { catchAsync } = useAsync()

    const persistAuthentication = catchAsync(async () => {
        if (!localStorage.getItem('jwt-token')) return
        const { member } = await httpRequest('/authenticate')
        dispatch(memberActions.setMember(member))
        setIsAuthenticated(true)
    })

    useEffect(() => {
        if (!isAuthenticated) {
            persistAuthentication()
        }
    }, [])

    return [isAuthenticated, isLoading]
}