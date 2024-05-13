import { api } from "@/libs/axios"
import { getAuth } from "@/utils/api"

export class TrackerService {
  update(data: any) {
    return api.request({
      method: "PUT",
      url: "/tracker",
      data,
      headers: { Authorization: getAuth() },
    })
  }
}
