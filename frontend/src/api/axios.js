
import { clearAccessToken, getAccessToken, setAccessToken } from "@/api/tokenStore";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    withCredentials: true,
})


// Attach the in-memory access token to every outgoing request.
axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// --- Silent refresh on 401, with request queueing -------------------------
let isRefreshing = false;
let pendingQueue = [];

const flushQueue = (error, token = null) => {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error)
        else resolve(token);
    });
    pendingQueue = [];
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // Plain axios (not axiosInstance) is used inside this block for the
        // refresh call itself, to avoid recursively triggering this same
        // interceptor if the refresh call also 401s.
        const isAuthEndpoint =
            originalRequest?.url?.includes('/auth/refresh-token') ||
            originalRequest?.url?.includes("/auth/login")
            

        if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            if (isRefreshing) {
                // A refresh is already in flight - wait for it instead of firing a second one.
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                }).then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    
                    //Now that I have a new access token, send the exact same request again
                    return axiosInstance(originalRequest);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${axiosInstance.defaults.baseURL}/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                // console.log(data?.data?.accessToken)
                const accessToken = data?.data?.accessToken;
                setAccessToken(accessToken);
                flushQueue(null, accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                flushQueue(refreshError, null);
                clearAccessToken();

                window.dispatchEvent(new Event('auth:logout'));
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;