let accessToken = "";

export const setAccessToken = (token) => {
    accessToken = token;
    console.log(accessToken);
};

export const getAccessToken = () => {
    return accessToken;
};
