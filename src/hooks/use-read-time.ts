import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"

export function useReadTime(type: "day" | "week" | "month" | "year") {
  return useQuery({
    queryKey: ["read time data", type],
    async queryFn() {
      const { data } = await Service.readTime.get(type)
      return data
    },
  })
}
