import { Service } from "@/services/app.service";

export class UserModel {
  user: User | undefined;
  jwt: string | undefined;

  async login(email: string, password: string) {
    const { data } = await Service.user.login({ email, password });
    if (data) {
      this.user = data.userInfo;
      this.jwt = data.jwt;
      return true;
    }
    this.logout();
    return false;
  }

  logout() {
    this.user = undefined;
    this.jwt = undefined;
  }
}
