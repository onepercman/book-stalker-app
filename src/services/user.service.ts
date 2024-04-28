import { api } from "@/libs/axios";

export class UserService {
  login(data: { email: string; password: string }) {
    return api.request<{ jwt: string; userInfo: User }>({
      method: "POST",
      url: "/users/login",
      data,
    });
  }
}
