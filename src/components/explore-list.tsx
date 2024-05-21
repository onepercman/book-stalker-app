import { BookCard } from "@/components/book-card"
import { Service } from "@/services/app.service"
import { Octicons } from "@expo/vector-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { FC } from "react"
import { ActivityIndicator, Dimensions, FlatList, Text, View } from "react-native"
import colors from "tailwindcss/colors"

export const ExploreList: FC<{ category?: string; search?: string }> = ({ category, search }) => {
  const { data, isFetching, isFetchingNextPage, refetch, fetchNextPage } = useInfiniteQuery<
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
      console.log({ category, search })

      const categoryId = category as string
      const { data } = await Service.book.list({
        categoryId,
        search,
        ...pageParam,
      })
      return data
    },
  })

  return (
    <FlatList
      refreshing={isFetching}
      onRefresh={() => refetch()}
      onEndReachedThreshold={0.8}
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
          <View></View>
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
  )
}
