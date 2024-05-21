import { useStore } from "@/libs/valtio"
import { Service } from "@/services/app.service"
import { userStore } from "@/stores/user.store"
import { useQuery } from "@tanstack/react-query"

export function useScheduleList() {
  const { jwt } = useStore(userStore)

  return useQuery({
    queryKey: ["schedule list", jwt],
    async queryFn() {
      const { data } = await Service.schedule.list()
      return data
    },
  })
}
