import { api } from "@/libs/axios"
import { getAuth } from "@/utils/api"

export class BookService {
  list() {
    return api.request<Book[]>({
      method: "GET",
      url: "/book",
    })
  }

  get(id: string) {
    return api.request<Book>({
      method: "GET",
      url: `/book/${id}`,
      headers: { Authorization: getAuth() },
    })
  }
}
