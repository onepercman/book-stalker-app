import { api } from "@/libs/axios"

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
    })
  }
}
