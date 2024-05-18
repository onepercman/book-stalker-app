import { api } from "@/libs/axios"

export class ReactionService {
  react(bookId: string) {
    return api.request({
      method: "POST",
      url: "/reactions",
      data: {
        type: "like",
        bookId,
      },
      headers: { Authorization: true },
    })
  }
}
