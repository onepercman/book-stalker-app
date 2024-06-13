import { Button } from "@/components/ui/button"
import { useLikedBooks } from "@/hooks/use-liked-books"
import { Service } from "@/services/app.service"
import { formatNumber } from "@/utils/number"
import { Octicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import moment from "moment"
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native"

export default function () {
  const router = useRouter()

  const { id } = useLocalSearchParams()

  const { refetch: refetchLikedBooks } = useLikedBooks()

  const { data, refetch } = useQuery({
    queryKey: ["book details", id],
    async queryFn() {
      const { data } = await Service.book.get(id as string)
      return data
    },
  })

  async function like(id: string) {
    const { data } = await Service.reaction.react(id)
    if (data) {
      refetch()
      refetchLikedBooks()
    }
  }

  if (!data) return

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="flex flex-col items-center gap-4 p-4">
          <Image source={{ uri: data.thumbnail }} className="aspect-[3/5] w-full rounded-xl" />
          <View className="flex flex-col items-center gap-4">
            <Text className="text-center text-2xl font-medium">{data?.name}</Text>
            <View className="rounded bg-primary-100 px-4 py-2">
              <Text className="text-center font-medium text-primary">{data?.category.name}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row gap-2 p-4">
          <Button
            variant="primary"
            rightIcon={<Octicons name="book" />}
            className="grow"
            onPress={() => router.replace(`/reading/${data._id}`)}
          >
            Đọc sách
          </Button>
          <Button
            leftIcon={<Octicons size={16} name={data.isLiked ? "heart-fill" : "heart"} color="red" />}
            onPress={() => like(data._id)}
          />
        </View>

        <View className="flex h-full flex-col gap-2 p-4">
          <View className="flex flex-row justify-between gap-2">
            <Text className="text-muted">Last Read</Text>
            <Text className="font-medium">
              {data.tracker?.lastVisit ? moment(data.tracker.lastVisit).format("lll") : "_"}
            </Text>
          </View>
          <View className="flex flex-row justify-between gap-2">
            <Text className="text-muted">Reading Progress</Text>
            <Text className="font-medium">
              {data.tracker?.currentPage ?? 0}/{data.tracker?.totalPage ?? 0} (
              {data.tracker?.currentPage && data.tracker?.totalPage
                ? formatNumber((data.tracker.currentPage * 100) / data.tracker.totalPage, 0)
                : "0"}
              %)
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
