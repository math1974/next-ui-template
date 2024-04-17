import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

const TokenInterceptor = config => {
	config.headers.Authorization = `Bearer ${localStorage.token}`;

	return config;
};

axiosClient.interceptors.request.use(TokenInterceptor)

export default axiosClient;