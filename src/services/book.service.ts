import { api } from "@/libs/axios"

export class BookService {
  list(params?: PaginationArgs & { categoryId?: string }) {
    return api.request<Paginated<Book>>({
      method: "GET",
      url: "/book",
      params,
    })
  }

  get(id: string) {
    return api.request<Book>({
      method: "GET",
      url: `/book/${id}`,
      headers: { Authorization: true },
    })
  }
}
