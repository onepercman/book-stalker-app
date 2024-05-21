import { BookCard } from "@/components/book-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategories } from "@/hooks/use-categories"
import { useDebounce } from "@/libs/custom-hooks/use-debounce"
import { Service } from "@/services/app.service"
import { Entypo, Octicons } from "@expo/vector-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import Constants from "expo-constants"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useRef, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export default function () {
  const router = useRouter()

  const scrollViewRef = useRef<ScrollView>(null)

  const { category } = useLocalSearchParams()

  const [searchText, setSearchText] = useState<string>()

  const search = useDebounce(searchText, 500)

  const { data: categories } = useCategories()

  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<
    Paginated<Book>,
    any,
    Paginated<Book>,
    any,
    Pick<Required<PaginationArgs>, "page" | "take">
  >({
    initialPageParam: {
      page: 1,
      take: 9,
    },
    getNextPageParam(_, __, { page, take }) {
      return {
        page: page + 1,
        take,
      }
    },
    queryKey: ["explore list data", category, search],
    select(data) {
      return {
        data: data.pages.flatMap((el) => el.data),
        count: data.pages[0].count,
      }
    },
    async queryFn({ pageParam }) {
      const categoryId = category as string
      const { data } = await Service.book.list({
        categoryId,
        search,
        ...pageParam,
      })
      return data
    },
    staleTime: 5000,
  })

  if (!categories?.length) return

  return (
    <View>
      <View className="-mb-20 h-40 w-full bg-primary p-4" style={{ paddingTop: Constants.statusBarHeight }}>
        <Text className="mx-auto text-xl font-medium text-invert">
          <Entypo size={16} name="compass" /> Khám phá
        </Text>
      </View>

      <View className="flex flex-row p-4">
        <Input
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
          className="grow"
          inputClasses="pr-10"
          placeholder="Tìm kiếm sách..."
        />
        <Text className="absolute right-8 top-[27px] text-muted">
          <Entypo size={20} name="magnifying-glass" />
        </Text>
      </View>

      <Tabs value={category || (categories[0]._id as any)} onChange={(e) => router.replace(`/explore/?category=${e}`)}>
        <TabsList className="overflow-auto">
          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TabsTrigger key={index} title={category.name} value={category._id} className="py-4" />
            ))}
          </ScrollView>
        </TabsList>
      </Tabs>

      <FlatList
        onEndReachedThreshold={0.3}
        onEndReached={function () {
          if (Number(data?.data.length) < Number(data?.count)) {
            fetchNextPage()
          }
        }}
        style={{ height: Dimensions.get("window").height - 260 }}
        numColumns={3}
        data={data?.data}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => <BookCard data={item} className="w-1/3" />}
        ListEmptyComponent={
          isFetching ? (
            <View className="flex h-64 flex-col">
              <ActivityIndicator animating color={colors.blue[500]} className="m-auto" />
            </View>
          ) : (
            <View className="flex flex-col items-center gap-3">
              <Text className="m-auto text-center text-muted">
                <Octicons name="no-entry" size={16} />
              </Text>
              <Text className="text-muted">Không tìm thấy kết quả</Text>
            </View>
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="flex h-64 flex-col">
              <ActivityIndicator animating color={colors.blue[500]} className="m-auto" />
            </View>
          ) : (
            <View className="h-32" />
          )
        }
      />
    </View>
  )
}
