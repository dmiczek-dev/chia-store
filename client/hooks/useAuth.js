import React, { useEffect, useState } from 'react';
import { getAccessToken, setAccessToken, setUserRole } from '../utils/accessToken';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

//TODO Repace with context ot prevent additional requests

function useAuth () {
    //TODO: Refactor
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const isTokenInvalidOrUndefined = () => {
        const token = getAccessToken();

        if (!token) {
            return true;
        }

        try {
            const { exp } = jwtDecode(token);
            return Date.now() < exp * 1000;
        } catch {
            return false;
        }
    }

    const refreshToken = async () => {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_URL + 'refresh-token', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
            })
            if (res.status === 200) {
                const { accessToken, role } = await res.json();
                setAccessToken(accessToken);
                setUserRole(role)
                setLoading(false);
                return true;
            } else {
                console.log('Refesh failed.');
                router.push('/login')
                return false;
            }
        } catch (error) {
            console.error(
                'You have an error in your code or there are Network issues.',
                error,
            );
            router.push('/login')
        }
    }

    const authV = async () => {
        if (isTokenInvalidOrUndefined()) {
            await refreshToken()
        }
    }

    useEffect(() => {
        authV();
    }, []);

    return loading;
}

export default useAuth;
