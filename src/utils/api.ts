import { userStore } from "@/stores/user.store";

export function getAuth() {
	return `Bearer ${userStore.getJwt()}`;
}
