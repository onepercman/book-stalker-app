import { Button } from "@/components/ui/button"
import { useReadTimePost } from "@/hooks/use-read-time-post"
import { cn } from "@/libs/utils"
import { Service } from "@/services/app.service"
import { trackerStore } from "@/stores/tracker.store"
import { Reader, Themes, useReader } from "@epubjs-react-native/core"
import { useFileSystem } from "@epubjs-react-native/expo-file-system"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, SafeAreaView, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const THEMES = Object.values(Themes)

export default function () {
  useReadTimePost()

  const { id } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ["book reading details", id],
    async queryFn() {
      const { data } = await Service.book.get(id as string)
      trackerStore.track({ bookId: data._id })
      return data
    },
  })

  const { totalLocations, currentLocation, section, theme, changeTheme, getCurrentLocation } = useReader()
  const { height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const switchTheme = () => {
    const index = Object.values(THEMES).indexOf(theme)
    const nextTheme = Object.values(THEMES)[(index + 1) % Object.values(THEMES).length]
    changeTheme(nextTheme)
  }

  useEffect(() => {
    const pos = getCurrentLocation()

    if (pos) {
      trackerStore.track({
        currentPage: pos.start.displayed.page,
        currentCfi: pos.start.href,
        totalPage: totalLocations,
        lastVisit: Date.now(),
      })
    }
  }, [totalLocations, currentLocation])

  useEffect(() => {
    return function () {
      trackerStore.updateTracker()
    }
  }, [])

  if (!data)
    return (
      <View className="flex h-full">
        <ActivityIndicator className="m-auto" />
      </View>
    )

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
      className="flex-1 justify-start"
    >
      <View className={cn("flex flex-row items-center justify-between px-4")}>
        <Button
          size="sm"
          variant="outline"
          labelClasses="text-line"
          className="rounded-full border-2"
          leftIcon={<Entypo name="chevron-left" size={20} onPress={() => router.back()} />}
        />

        <View>
          <TouchableOpacity onPress={switchTheme}>
            <View
              className="h-10 w-10 rounded-full border-2 border-line"
              style={{ backgroundColor: theme.body.background }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Reader
        src={data.uri}
        height={height * 0.8}
        fileSystem={useFileSystem}
        defaultTheme={Themes.DARK}
        initialLocation={data.tracker?.currentCfi ?? undefined}
        allowPopups
      />
      <View className="flex flex-row justify-center px-4">
        <Button>
          {currentLocation?.start.displayed.page}/{totalLocations}
        </Button>
      </View>
    </SafeAreaView>
  )
}
