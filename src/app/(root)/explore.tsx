import { ExploreList } from "@/components/explore-list"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCategories } from "@/hooks/use-categories"
import { useDebounce } from "@/libs/custom-hooks/use-debounce"
import { Entypo } from "@expo/vector-icons"
import Constants from "expo-constants"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"

export default function () {
  const router = useRouter()

  const scrollViewRef = useRef<ScrollView>(null)

  const { category } = useLocalSearchParams()

  const [searchText, setSearchText] = useState<string>()

  const search = useDebounce(searchText, 500)

  const { data: categories } = useCategories()

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

      <Tabs value={category as string} onChange={(e) => router.replace(`/explore/?category=${e}`)}>
        <TabsList className="overflow-auto">
          <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TabsTrigger key={index} title={category.name} value={category._id} className="py-4" />
            ))}
          </ScrollView>
        </TabsList>
        {categories.map((cate) => (
          <TabsContent value={cate._id}>
            <ExploreList key={cate._id} category={category as string} search={search} />
          </TabsContent>
        ))}
      </Tabs>
    </View>
  )
}
