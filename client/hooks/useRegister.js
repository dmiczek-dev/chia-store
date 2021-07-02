import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../utils/accessToken';
import jwtDecode from "jwt-decode";
import { useRouter } from 'next/router';

function useAuth () {
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setLoading(false)
            router.push('/app')
        }

        const checkToken = async () => {

            try {
                const { exp } = jwtDecode(token);
                return Date.now() < exp * 1000;
            } catch {
                return false;
            }
        }
        checkToken();
    }, []);

    return loading;
}

export default useAuth;
