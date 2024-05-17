import { BookCard } from "@/components/book-card"
import { CategoryCard } from "@/components/category-card"
import { useCategories } from "@/hooks/use-categories"
import { Service } from "@/services/app.service"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native"
import Carousel from "react-native-reanimated-carousel"

export default function () {
  const { data } = useQuery({
    queryKey: ["home book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data
    },
  })

  const { data: categories } = useCategories()

  if (!data?.length) return null

  const width = Dimensions.get("window").width

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className="p-4 font-semibold">
            <Entypo size={16} name="clock" /> Đọc tiếp
          </Text>
          <Carousel
            loop={false}
            style={{ width: width }}
            data={data}
            width={width / 3}
            height={200}
            renderItem={({ item }) => <BookCard data={item} />}
          />
        </View>

        <View>
          <Text className="p-4 font-semibold">
            <Entypo size={16} name="star" /> Đã thích
          </Text>
          <Carousel
            loop={false}
            style={{ width: width }}
            data={data}
            width={width / 3}
            height={200}
            renderItem={({ item }) => <BookCard data={item} />}
          />
        </View>

        <View>
          <Text className="p-4 font-semibold">
            <Entypo size={16} name="list" /> Thể loại
          </Text>
          <Carousel
            loop={false}
            style={{ width: width }}
            data={categories}
            width={width / 3}
            height={200}
            renderItem={({ item }) => <CategoryCard data={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
