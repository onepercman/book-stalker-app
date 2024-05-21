import { api } from "@/libs/axios"

export class ScheduleService {
  list() {
    return api.request<Schedule[]>({
      method: "GET",
      url: "/schedule",
      headers: { Authorization: true },
    })
  }

  create(data: Partial<Schedule>) {
    return api.request<Schedule>({
      method: "POST",
      url: "/schedule",
      data,
      headers: { Authorization: true },
    })
  }

  delete(id: string) {
    return api.request<Schedule>({
      method: "DELETE",
      url: `/schedule/${id}`,
      headers: { Authorization: true },
    })
  }
}
