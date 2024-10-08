import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileAvatar } from "@/components/user/profile-avatar"
import { ScheduleList } from "@/components/user/schedule-list"
import { useLikedBooks } from "@/hooks/use-liked-books"
import { useStore } from "@/libs/valtio"
import { userStore } from "@/stores/user.store"
import { AntDesign, Octicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import { useRef } from "react"
import { FlatList, ScrollView, Text, View } from "react-native"

export default function () {
  const { user } = useStore(userStore)

  const scrollViewRef = useRef<ScrollView>(null)

  const { data: likedBooks } = useLikedBooks()

  if (!user) return

  return (
    <View>
      <View className="h-full ">
        <View className="flex flex-row gap-4 bg-primary p-4" style={{ paddingTop: Constants.statusBarHeight }}>
          <ProfileAvatar />
          <View className="flex flex-col">
            <Text className="text-2xl font-semibold text-invert">{user.name}</Text>
            <Text className="text-sm font-semibold text-invert/70">{user.email}</Text>
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
          <TabsList className="py-2">
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
            {likedBooks ? (
              <FlatList
                className="h-full"
                numColumns={3}
                data={likedBooks}
                keyExtractor={(e) => e._id}
                renderItem={({ item }) => <BookCard data={item} className="w-1/3" />}
              />
            ) : null}
          </TabsContent>
          <TabsContent value="2">
            <ScheduleList />
          </TabsContent>
        </Tabs>
      </View>

      {/* <UploadBook /> */}
    </View>
  )
}
