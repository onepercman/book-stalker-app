import { Button } from "@/components/ui/button"
import { Service } from "@/services/app.service"
import { Reader, Themes, useReader } from "@epubjs-react-native/core"
import { useFileSystem } from "@epubjs-react-native/expo-file-system"
import { Entypo } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const THEMES = Object.values(Themes)

export default function () {
  const { id } = useLocalSearchParams()

  const { data } = useQuery({
    queryKey: ["book reading details", id],
    async queryFn() {
      const { data } = await Service.book.get(id as string)
      return data
    },
  })

  const { theme, changeTheme } = useReader()
  const { height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const switchTheme = () => {
    const index = Object.values(THEMES).indexOf(theme)
    const nextTheme = Object.values(THEMES)[(index + 1) % Object.values(THEMES).length]

    changeTheme(nextTheme)
  }

  if (!data) return

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
      <View className="flex flex-row items-center justify-between px-4">
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
      <Reader src={data.uri} height={height * 0.8} fileSystem={useFileSystem} defaultTheme={Themes.DARK} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
})
