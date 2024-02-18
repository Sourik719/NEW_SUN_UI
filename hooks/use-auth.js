import { memberActions } from "@/store/member-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAsync } from "./use-async"
import { useHttp } from "./use-http"

export const useAuth = () => {
    const dispatch = useDispatch()
    const { member: hasMember } = useSelector(state => state.member)
    const [isAuthenticated, setIsAuthenticated] = useState(hasMember)
    const [httpRequest, isLoading] = useHttp()
    const { catchAsync } = useAsync()

    const persistAuthentication = catchAsync(async () => {
        if (!localStorage.getItem('jwt-token')) return
        const responseData = await httpRequest('/authenticate')
        dispatch(memberActions.setMember(responseData.data.member))
        setIsAuthenticated(true)
    })

    useEffect(() => {
        if (!isAuthenticated) {
            persistAuthentication()
        }
    }, [isAuthenticated, persistAuthentication])

    return [isAuthenticated, isLoading]
}