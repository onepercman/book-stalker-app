import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { FlatList } from "react-native"
import { BookCard } from "./book-card"

export const ExploreList: FC = () => {
  const { data } = useQuery({
    queryKey: ["explore book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data
    },
  })

  if (!data?.length) return null

  return (
    <FlatList
      className="h-full"
      numColumns={3}
      data={data}
      keyExtractor={(e) => e._id}
      renderItem={({ item }) => <BookCard data={item} className="w-1/3" />}
    />
  )
}
