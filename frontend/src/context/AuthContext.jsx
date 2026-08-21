import React, { createContext, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clearAccessToken, setAccessToken } from '@/api/tokenStore';
import { getCurrentUserRequest, logoutRequest } from '@/api/authApi';
import { mergeCartRequest } from '@/api/cartApi';
import { CART_QUERY_KEY } from '@/hooks/useCart';


export const AuthContext = createContext(null);

export const AUTH_ME_QUERY_KEY = ["auth", "me"];


const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: getCurrentUserRequest,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
    // console.log(user)

    const login = useCallback(
        async (accessToken, userData) => {

            setAccessToken(accessToken);
            try {
                await mergeCartRequest();
            } catch (err) {
                console.error('Failed to merge guest cart on login', err);
            }
            // }

            if (userData) {
                queryClient.setQueryData(AUTH_ME_QUERY_KEY, userData);
            } else {
                await queryClient.refetchQueries({ queryKey: AUTH_ME_QUERY_KEY });
            }
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        },
        [queryClient]                 
    );


    

    const logout = useCallback(async () => {
        try {
            await logoutRequest();
        } catch {
            
        } finally {
            clearAccessToken();
            // It directly changes the cache.
            queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
        }
    }, [queryClient]);

    useEffect(
        () => {
            const handleForcedLogout = () => {
                clearAccessToken();
                queryClient.setQueryData(AUTH_ME_QUERY_KEY, null);
            }
            
            window.addEventListener('auth:logout', handleForcedLogout);
            queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });

            return () => window.removeEventListener('auth:logout', handleForcedLogout);
        }, [queryClient]);

    const value = {
        user: user ?? null,
        isAuthenticated: !!user,
        isAuthLoading,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export default AuthProvider;