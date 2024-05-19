import { ExploreList } from "@/components/explore-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategories } from "@/hooks/use-categories"
import { Service } from "@/services/app.service"
import { Entypo } from "@expo/vector-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import Constants from "expo-constants"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { ScrollView, Text, View } from "react-native"

export default function () {
  const router = useRouter()

  const scrollViewRef = useRef<ScrollView>(null)

  const { category } = useLocalSearchParams()

  const { data: categories } = useCategories()

  const { data, fetchNextPage } = useInfiniteQuery<
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
    queryKey: ["explore list data", category],
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
        ...pageParam,
      })
      return data
    },
    staleTime: 5000,
  })

  useEffect(() => {
    let index = categories?.findIndex((e) => e._id === category) || 0
    if (index === -1) index = 0
    scrollViewRef.current?.scrollTo({ x: (index * 750) / (categories?.length || 1) })
  }, [category])

  if (!categories?.length) return

  return (
    <View>
      <View className="-mb-20 h-40 w-full bg-primary p-4" style={{ paddingTop: Constants.statusBarHeight }}>
        <Text className="mx-auto text-xl font-medium text-invert">
          <Entypo size={16} name="compass" /> Khám phá
        </Text>
      </View>
      <View className="flex flex-col">
        <View className="flex flex-row gap-2 p-4">
          <Input className="grow" placeholder="Tìm kiếm sách..." />
          <Button leftIcon={<Entypo size={20} name="magnifying-glass" />} />
        </View>

        <Tabs
          value={category || (categories[0]._id as any)}
          onChange={(e) => router.replace(`/explore/?category=${e}`)}
        >
          <TabsList className="overflow-auto">
            <ScrollView ref={scrollViewRef} horizontal>
              {categories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  title={category.name}
                  value={category._id}
                  onPressOut={function () {
                    scrollViewRef.current?.scrollTo({ x: (index * 750) / categories.length })
                  }}
                />
              ))}
            </ScrollView>
          </TabsList>
        </Tabs>
        {data?.data.length ? <ExploreList data={data.data} /> : <View></View>}
        {Number(data?.data.length) < Number(data?.count) ? <Button onPress={() => fetchNextPage()}>More</Button> : null}
      </View>
    </View>
  )
}
