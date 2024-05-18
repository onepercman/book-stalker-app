import { api } from "@/libs/axios"

export class ReadTimeService {
  post(bookId: string) {
    return api.request({
      method: "POST",
      url: "/read-time",
      data: { bookId },
      headers: { Authorization: true },
    })
  }

  get(type: string) {
    return api.request<Array<{ time: string; value: number }>>({
      method: "GET",
      url: "/read-time",
      params: { type },
      headers: { Authorization: true },
    })
  }
}
