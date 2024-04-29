import { Service } from "@/services/app.service";

export class UserModel {
	user: User | undefined;
	jwt: string | undefined;

	async register(email: string, password: string) {
		const response = await Service.user.register({ email, password });
		if (response.data) {
			const { data } = response;
			this.user = data.user;
			this.jwt = data.jwt;
		} else {
			this.logout();
		}
		return response;
	}

	async login(email: string, password: string) {
		const response = await Service.user.login({ email, password });
		if (response.data) {
			const { data } = response;
			this.user = data.user;
			this.jwt = data.jwt;
		} else {
			this.logout();
		}
		return response;
	}

	logout() {
		this.user = undefined;
		this.jwt = undefined;
	}

	getJwt() {
		return this.jwt;
	}
}
