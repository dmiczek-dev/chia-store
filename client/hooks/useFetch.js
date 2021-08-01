import { useEffect, useState } from 'react';
import { getAccessToken } from '../utils/accessToken';

export const useFetch = (url, isAuth = false, body = {}, customConfig = {}, onPageLoad) => {
    const states = {
        empty: 'empty',
        isLoading: 'loading',
        success: 'loaded',
        error: 'error',
    };

    const actions = {
        fetch: 'FETCH',
        fetchSuccess: 'FETCH_SUCCESS',
        fetchError: 'FETCH_ERROR',
    };

    let config = {};
    if (isAuth) {
        config = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: body,
            ...customConfig,
        };
    } else {
        config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            ...customConfig,
        };
    }

    const [currentState, setCurrentState] = useState(states.empty);
    const [data, setData] = useState();

    const transitions = {
        [states.empty]: {
            [actions.fetch]: states.isLoading,
        },
        [states.isLoading]: {
            [actions.fetchSuccess]: states.success,
            [actions.fetchError]: states.error,
        },
        [states.success]: {
            [actions.fetch]: states.isLoading,
        },
        [states.error]: {
            [actions.fetch]: states.isLoading,
        },
    };

    function transition (currentState, action) {
        const nextState = transitions[currentState][action];
        return nextState || currentState;
    }

    const compareState = (state) => currentState === state;

    function updateState (action) {
        setCurrentState((currentState) => transition(currentState, action));
    }

    const fetchData = async () => {
        updateState(actions.fetch);
        const response = await fetch(url, config);
        if (response.ok) {
            const data = await response.json();
            setData(data);
            updateState(actions.fetchSuccess);
        } else {
            updateState(actions.fetchError);
        }
    };

    useEffect(() => {
        if (onPageLoad) {
            let ignore = fetchData();
        }
    }, []);

    return { data, states, compareState, fetchData };
};

/*
 const {data, states, compareState, fetchData} = useFetch(process.env.NEXT_PUBLIC_URL + "protected", true)

    <button onClick={fetchData}>Klis</button>
    { compareState(states.success) && console.log(data)}
    { compareState(states.error) ? (
        <div>
            <p>Oh no something went wrong!</p>
        </div>
    ) : null}
    { compareState(states.empty) ? <div>No data yet</div> : null}

*/
