import * as Storage from "expo-secure-store"

export function getAuth() {
  try {
    const jwt = Storage.getItem("jwt")
    return `Bearer ${jwt}`
  } catch (err) {
    return ""
  }
}
