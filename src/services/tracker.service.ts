import { api } from "@/libs/axios"

export class TrackerService {
  update(data: any) {
    return api.request({
      method: "PUT",
      url: "/tracker",
      data,
      headers: { Authorization: true },
    })
  }
}
