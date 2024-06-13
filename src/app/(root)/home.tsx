import { BookCard } from "@/components/book-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/hooks/use-categories"
import { useContinousBooks } from "@/hooks/use-continous-books"
import { useLikedBooks } from "@/hooks/use-liked-books"
import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { Entypo, Octicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import { useRouter } from "expo-router"
import { Dimensions, ScrollView, Text, View } from "react-native"
import Carousel from "react-native-reanimated-carousel"

const width = Dimensions.get("window").width

export default function () {
  const router = useRouter()

  const { user } = useStore(userStore)

  const { data: continousBooks } = useContinousBooks()

  const { data: likedBooks } = useLikedBooks()

  const { data: categories } = useCategories()

  return (
    <View className="relative">
      <View className="absolute h-64 w-full bg-primary" />
      <View>
        <ScrollView className="h-full px-4">
          <View className="flex flex-col gap-1 py-4" style={{ marginTop: Constants.statusBarHeight }}>
            <Text className="text-3xl font-semibold text-invert">👋 Chào mừng {user?.name}</Text>
            <Text className="pl-11 text-xl font-medium text-invert">Hãy đọc sách mỗi ngày nhé !</Text>
          </View>

          {continousBooks ? (
            <View className="my-4 rounded-2xl border border-line bg-background shadow-light shadow-gray-400/50">
              <Text className="p-4 text-xl font-semibold">
                <Entypo size={16} name="clock" /> Đọc tiếp
              </Text>
              <Carousel
                loop={false}
                style={{ width: width - 32 }}
                data={continousBooks}
                width={(width - 32) / 3}
                height={200}
                renderItem={({ item }) => <BookCard data={item} />}
              />
            </View>
          ) : (
            <View className="flex w-full flex-col gap-4 rounded-2xl bg-background p-4 shadow-light shadow-gray-400/50">
              <Text className="font-medium">
                Có vẻ như bạn mới bắt đầu, hãy thử tìm kiếm cuốn sách yêu thích ngay nào ! 🫢
              </Text>

              <Button
                variant="primary"
                rightIcon={<Octicons name="light-bulb" />}
                onPress={() => router.replace("/explore")}
              >
                Khám phá ngay
              </Button>
            </View>
          )}

          {likedBooks ? (
            <View className="my-4 rounded-2xl border border-line bg-background shadow-light shadow-gray-400/50">
              <Text className="p-4 text-xl font-semibold">
                <Entypo size={16} name="star" /> Đã thích
              </Text>
              <Carousel
                loop={false}
                style={{ width: width - 32 }}
                data={likedBooks}
                width={(width - 32) / 3}
                height={200}
                renderItem={({ item }) => <BookCard data={item} />}
              />
            </View>
          ) : (
            <View className="flex w-full flex-col gap-4 rounded-2xl bg-background p-4 shadow-light shadow-gray-400/50">
              <Text>💡 Tip:</Text>
              <Text className="font-medium">
                Bạn có thể thêm sách vào danh sách yêu thích bằng cách bấm vào nút ♥️ khi đọc sách nhé
              </Text>

              <Button
                variant="primary"
                rightIcon={<Octicons name="search" />}
                onPress={() => router.replace("/explore")}
              >
                Tìm kiếm sách
              </Button>
            </View>
          )}

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
        </ScrollView>
      </View>
    </View>
  )
}
