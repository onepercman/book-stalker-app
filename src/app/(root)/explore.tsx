import { ExploreList } from "@/components/explore-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategories } from "@/hooks/use-categories"
import { Service } from "@/services/app.service"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useRef } from "react"
import { SafeAreaView, ScrollView, View } from "react-native"

export default function () {
  const scrollViewRef = useRef<ScrollView>(null)

  const { category } = useLocalSearchParams()

  const { data: categories } = useCategories()

  const { data } = useQuery({
    queryKey: ["explore book list"],
    async queryFn() {
      const { data } = await Service.book.list()
      return data
    },
  })

  useEffect(() => {
    let index = categories?.findIndex((e) => e._id === category) || 0
    if (index === -1) index = 0
    scrollViewRef.current?.scrollTo({ x: (index * 750) / (categories?.length || 1) })
  }, [category])

  if (!data?.length) return null

  if (!categories) return

  return (
    <SafeAreaView className="flex flex-col">
      <View className="flex flex-row gap-2 p-4">
        <Input className="grow" placeholder="Tìm kiếm sách..." />
        <Button leftIcon={<Entypo size={20} name="magnifying-glass" />} />
      </View>

      <Tabs value={category || (categories[0]._id as any)}>
        <TabsList className="overflow-auto">
          <ScrollView ref={scrollViewRef} horizontal>
            {[{ _id: "", name: "Mọi thể loại" }, ...categories].map((category, index) => (
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
        {[{ _id: "" }, ...categories].map((category, index) => (
          <TabsContent value={category._id} key={index}>
            <ExploreList />
          </TabsContent>
        ))}
      </Tabs>
    </SafeAreaView>
  )
}
