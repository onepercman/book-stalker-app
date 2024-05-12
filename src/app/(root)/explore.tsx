import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Service } from "@/services/app.service"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { FlatList, SafeAreaView, View } from "react-native"

export default function () {
  const { data } = useQuery({
    queryKey: ["explore book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data
    },
  })

  if (!data?.length) return null

  return (
    <SafeAreaView className="flex flex-col">
      <View className="flex flex-row gap-2 p-4">
        <Input className="grow" placeholder="Search for books..." />
        <Button leftIcon={<Entypo size={20} name="magnifying-glass" />} />
      </View>

      <FlatList
        className="h-full"
        numColumns={3}
        data={data}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => <BookCard data={item} className="w-1/3" />}
      />
    </SafeAreaView>
  )
}
