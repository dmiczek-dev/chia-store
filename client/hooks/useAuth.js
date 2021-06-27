import React, { useEffect, useState } from 'react';
import { getAccessToken, setAccessToken } from '../utils/accessToken';
import { useRouter } from 'next/router';

function useAuth () {
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setLoading(false)
            return loading;
        }

        const checkToken = async () => {
            try {
                const res = await fetch('http://localhost:3001/refresh-token', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                    },
                })
                if (res.status === 200) {
                    const { accessToken } = await res.json();
                    setAccessToken(accessToken);
                    setLoading(false);
                } else {
                    console.log('Refesh failed.');
                    router.push('/app/login')
                }
            } catch (error) {
                console.error(
                    'You have an error in your code or there are Network issues.',
                    error,
                );
            }
        }
        checkToken();
    }, []);

    return loading;
}

export default useAuth;

