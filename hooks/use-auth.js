
import { memberActions } from '@/store/member-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from './use-http';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [httpRequest] = useHttp();

    const { token, member } = useSelector((state) => state.member);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const persistAuthentication = async () => {
            setIsAuthLoading(true);

            try {
                const savedToken = localStorage.getItem('jwt-token');

                if (!savedToken) {
                    dispatch(memberActions.clearMember());

                    if (!cancelled) {
                        setIsAuthenticated(false);
                        setIsAdmin(false);
                    }

                    return;
                }

                // Reuse already-restored authentication state.
                if (
                    token === savedToken &&
                    member &&
                    member._id
                ) {
                    if (!cancelled) {
                        setIsAuthenticated(true);
                        setIsAdmin(member.designation === 'Admin');
                    }

                    return;
                }

                // Validate the saved token with the backend.
                const { data } = await httpRequest(
                    '/authenticate',
                    'GET',
                    null
                );

                if (!data?.member) {
                    throw new Error('Authentication failed.');
                }

                if (cancelled) return;

                dispatch(memberActions.setToken(savedToken));
                dispatch(memberActions.setMember(data.member));

                setIsAuthenticated(true);
                setIsAdmin(data.member.designation === 'Admin');
            } catch (error) {
                if (!cancelled) {
                    localStorage.removeItem('jwt-token');
                    dispatch(memberActions.clearMember());

                    setIsAuthenticated(false);
                    setIsAdmin(false);
                }
            } finally {
                if (!cancelled) {
                    setIsAuthLoading(false);
                }
            }
        };

        persistAuthentication();

        return () => {
            cancelled = true;
        };
    }, [dispatch, httpRequest, token, member]);


    return [isAuthenticated, isAuthLoading, isAdmin];
};
