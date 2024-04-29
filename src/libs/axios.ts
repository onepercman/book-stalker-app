import { API_URL } from "@/config/endpoints.config";
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

const requestHandler = {
	onFulfilled(config: InternalAxiosRequestConfig) {
		return config;
	},
};

const responseHandler = {
	onFulfilled(response: AxiosResponse) {
		return Promise.resolve(response);
	},
	onRejected(error: AxiosError) {
		if (error.response?.data) {
			const message = (error.response.data as any)["message"];
			error.response.statusText = message;
			error.response.data = null;
			return Promise.resolve(error.response);
		}
		return Promise.resolve(null);
	},
};

export const api: AxiosInstance = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: {},
});

api.interceptors.request.use(requestHandler.onFulfilled);
api.interceptors.response.use(
	responseHandler.onFulfilled,
	responseHandler.onRejected,
);
