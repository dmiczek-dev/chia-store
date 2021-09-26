let accessToken = '';
let userRole = '';

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

export const setUserRole = (role) => {
    userRole = role;
};

export const getUserRole = () => {
    return userRole;
};
