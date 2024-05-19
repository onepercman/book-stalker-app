import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  return useQuery({
    queryKey: ["category list"],
    async queryFn() {
      const { data } = await Service.category.list()
      return [
        {
          _id: "",
          name: "Mọi thể loại",
          image:
            "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        ...data,
      ]
    },
  })
}
