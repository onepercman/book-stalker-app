import { useStore } from "@/libs/valtio"
import { Service } from "@/services/app.service"
import { userStore } from "@/stores/user.store"
import { useQuery } from "@tanstack/react-query"

export function useLikedBooks() {
  const { jwt } = useStore(userStore)

  return useQuery({
    queryKey: ["liked books", jwt],
    async queryFn() {
      const { data } = await Service.book.liked()
      return data
    },
  })
}
