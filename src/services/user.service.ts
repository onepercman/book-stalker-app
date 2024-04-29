import { api } from "@/libs/axios";

export class UserService {
	register(data: { email: string; password: string }) {
		return api.request<{ jwt: string; user: User }>({
			method: "POST",
			url: "/users/register",
			data,
		});
	}

	login(data: { email: string; password: string }) {
		return api.request<{ jwt: string; user: User }>({
			method: "POST",
			url: "/users/login",
			data,
		});
	}
}
