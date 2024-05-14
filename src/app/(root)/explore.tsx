import { ExploreList } from "@/components/explore-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Service } from "@/services/app.service"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useRef } from "react"
import { SafeAreaView, ScrollView, View } from "react-native"

const categories = [
  "Mọi thể loại",
  "Tiểu thuyết",
  "Khoa học",
  "Giả tưởng",
  "Lãng mạn",
  "Kinh dị",
  "Trinh thám",
  "Kinh điển",
  "Giáo dục",
  "Lịch sử",
  "Nấu ăn",
]

export default function () {
  const scrollViewRef = useRef<ScrollView>(null)

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
        <Input className="grow" placeholder="Tìm kiếm sách..." />
        <Button leftIcon={<Entypo size={20} name="magnifying-glass" />} />
      </View>

      <Tabs defaultValue={categories[0]}>
        <TabsList className="overflow-auto">
          <ScrollView ref={scrollViewRef} horizontal>
            {categories.map((category, index) => (
              <TabsTrigger
                title={category}
                value={category}
                onPressOut={function (e) {
                  scrollViewRef.current?.scrollTo({ x: (index * 750) / categories.length })
                }}
              />
            ))}
          </ScrollView>
        </TabsList>
        {categories.map((category) => (
          <TabsContent value={category}>
            <ExploreList />
          </TabsContent>
        ))}
      </Tabs>
    </SafeAreaView>
  )
}
