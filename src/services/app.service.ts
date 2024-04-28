import { UserService } from "./user.service";

export const Service = Object.freeze({
  user: new UserService(),
});
