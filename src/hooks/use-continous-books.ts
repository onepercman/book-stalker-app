import { useStore } from "@/libs/valtio"
import { Service } from "@/services/app.service"
import { userStore } from "@/stores/user.store"
import { useQuery } from "@tanstack/react-query"

export function useContinousBooks() {
  const { jwt } = useStore(userStore)

  return useQuery({
    queryKey: ["continous books", jwt],
    async queryFn() {
      const { data } = await Service.book.continous()
      return data
    },
  })
}
