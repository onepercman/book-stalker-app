export class UserModel {
  user: User | undefined;
  jwt: string | undefined;

  async login(email: string, password: string) {}
}
