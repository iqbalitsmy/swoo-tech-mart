import axiosInstance from "./axios";


export const loginRequest = async ({ email, password }) => {
    const { data } = await axiosInstance.post('/auth/login', { email, password });
    return data;
}

export const registerRequest = async (payload) => {
    const { data } = await axiosInstance.post('/auth/register', payload);
    return data;
}

export const logoutRequest = async () => {
    const { data } = await axiosInstance.post('/auth/logout');
    return data;
}

export const changePasswordRequest = async ({ currentPassword, newPassword }) => {
    console.log(currentPassword, newPassword)
    const { data } = await axiosInstance.patch('/users/me/password', {
        currentPassword,
        newPassword,
    });
    return data;
};

export const getCurrentUserRequest = async () => {
    const { data } = await axiosInstance.get("/users/me");
    return data.data;
}

export const refreshAccessToken = async () => {
    const { data } = await axiosInstance.post('/auth/refresh-token');

    return data;
}


export const oauthRedirectUrl = (provider) => {
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
    return `${base}/oauth2/authorize/${provider}`;
}