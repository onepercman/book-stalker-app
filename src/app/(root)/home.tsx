import { BookCard } from "@/components/book-card"
import { CategoryCard } from "@/components/category-card"
import { useCategories } from "@/hooks/use-categories"
import { Service } from "@/services/app.service"
import { Entypo, Octicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import Constants from "expo-constants"
import { Dimensions, ScrollView, Text, View } from "react-native"
import Carousel from "react-native-reanimated-carousel"

export default function () {
  const { data } = useQuery({
    queryKey: ["home book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data.data
    },
  })

  const { data: categories } = useCategories()

  if (!data?.length) return null

  const width = Dimensions.get("window").width

  return (
    <ScrollView>
      <View className="-mb-32 h-52 w-full bg-primary p-4" style={{ paddingTop: Constants.statusBarHeight }}>
        <Text className="mx-auto text-xl font-medium text-invert">
          <Octicons size={16} name="home" /> Trang chủ
        </Text>
      </View>
      <View className="px-4">
        <View className="my-4 rounded-2xl border border-line bg-background shadow-light shadow-gray-400/50">
          <Text className="p-4 text-xl font-semibold">
            <Entypo size={16} name="clock" /> Đọc tiếp
          </Text>
          <Carousel
            loop={false}
            style={{ width: width - 32 }}
            data={data}
            width={(width - 32) / 3}
            height={200}
            renderItem={({ item }) => <BookCard data={item} />}
          />
        </View>

        <View className="my-4 rounded-2xl border border-line bg-background shadow-light shadow-gray-400/50">
          <Text className="p-4 text-xl font-semibold">
            <Entypo size={16} name="star" /> Đã thích
          </Text>
          <Carousel
            loop={false}
            style={{ width: width - 32 }}
            data={data}
            width={(width - 32) / 3}
            height={200}
            renderItem={({ item }) => <BookCard data={item} />}
          />
        </View>

        <View className="my-4 rounded-2xl border border-line bg-background shadow-light shadow-gray-400/50">
          <Text className="p-4 text-xl font-semibold">
            <Entypo size={16} name="list" /> Thể loại
          </Text>
          <Carousel
            loop={false}
            style={{ width: width - 32 }}
            data={categories!}
            width={(width - 32) / 3}
            height={200}
            renderItem={({ item }) => <CategoryCard data={item as any} />}
          />
        </View>
      </View>
    </ScrollView>
  )
}
