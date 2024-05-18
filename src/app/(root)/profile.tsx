import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileAvatar } from "@/components/user/profile-avatar"
import { useStore } from "@/libs/valtio"
import { Service } from "@/services/app.service"
import { userStore } from "@/stores/user.store"
import { AntDesign, Octicons } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native"

export default function () {
  const { user } = useStore(userStore)

  const scrollViewRef = useRef<ScrollView>(null)

  const { data: bookList } = useQuery({
    queryKey: ["profile book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data
    },
  })

  if (!user) return

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="flex flex-row gap-4 p-4">
          <ProfileAvatar />
          <View className="flex flex-col">
            <Text className="text-2xl font-semibold">{user.name}</Text>
            <Text className="text-sm font-semibold text-muted">{user.email}</Text>
            <Button
              size="sm"
              rightIcon={<AntDesign name="logout" />}
              onPress={() => userStore.logout()}
              className="mt-2.5"
            >
              Đăng xuất
            </Button>
          </View>
        </View>
        <Tabs defaultValue="1">
          <TabsList>
            <ScrollView ref={scrollViewRef} horizontal>
              <TabsTrigger
                className="flex-1"
                value="1"
                title={
                  <View className="flex flex-row gap-2">
                    <Octicons name="heart" size={16} />
                    <Text>Danh sách yêu thích</Text>
                  </View>
                }
              />
              <TabsTrigger
                className="flex-1"
                value="2"
                title={
                  <View className="flex flex-row gap-2">
                    <Octicons name="calendar" size={16} />
                    <Text>Lịch đọc</Text>
                  </View>
                }
              />
            </ScrollView>
          </TabsList>

          <TabsContent value="1">
            {bookList ? (
              <FlatList
                className="h-full"
                numColumns={3}
                data={bookList}
                keyExtractor={(e) => e._id}
                renderItem={({ item }) => <BookCard data={item} className="w-1/3" />}
              />
            ) : null}
          </TabsContent>
          <TabsContent value="2"></TabsContent>
        </Tabs>
      </View>

      {/* <UploadBook /> */}
    </SafeAreaView>
  )
}
