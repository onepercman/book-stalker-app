import { userStore } from "@/stores/user.store";

export function getAuth() {
  const { jwt } = userStore;
  return `Bearer ${jwt}`;
}
