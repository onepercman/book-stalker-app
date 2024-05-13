import { API_URL } from "@/config/endpoints.config"
import { Service } from "@/services/app.service"
import { appStore } from "@/stores/app.store"
import { getAuth } from "@/utils/api"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"

export class UserModel {
  user: User | undefined
  jwt: string | undefined

  async register(email: string, password: string) {
    const response = await Service.user.register({ email, password })
    if (response.data) {
      const { data } = response
      this.user = data.user
      this.jwt = data.jwt
    } else {
      this.logout()
    }
    return response
  }

  async login(email: string, password: string) {
    const response = await Service.user.login({ email, password })
    if (response.data) {
      const { data } = response
      this.user = data.user
      this.jwt = data.jwt
    } else {
      this.logout()
    }
    return response
  }

  async updateAvatar() {
    try {
      if (!this.user) return
      const { assets } = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] })
      if (!assets?.length) return
      appStore.setLoading(true)
      const uri = assets[0].uri
      const { body } = await FileSystem.uploadAsync(`${API_URL}/user/update-avatar`, uri, {
        httpMethod: "POST",
        fieldName: "file",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: getAuth(),
        },
      })
      const user = JSON.parse(body) as User
      this.user = user
      return this.user.avatar
    } catch (err) {
      alert("Update avatar failed")
    } finally {
      appStore.setLoading(false)
    }
  }

  logout() {
    this.user = undefined
    this.jwt = undefined
  }

  getJwt() {
    return this.jwt
  }
}
