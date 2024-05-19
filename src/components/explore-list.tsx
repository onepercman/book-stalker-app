import { FC } from "react"
import { FlatList } from "react-native"
import { BookCard } from "./book-card"

export const ExploreList: FC<{ data: Book[] }> = ({ data }) => {
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
