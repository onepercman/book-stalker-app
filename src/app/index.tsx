import { Images } from "@/assets"
import { Button } from "@/components/ui/button"
import { Octicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ImageBackground, Pressable, SafeAreaView, Text, View } from "react-native"

export default function () {
  const router = useRouter()

  return (
    <ImageBackground source={Images.background} resizeMode="cover">
      <SafeAreaView className="flex h-screen w-screen flex-col items-center justify-between bg-gradient-to-b from-primary to-transparent">
        <View className="flex grow flex-col items-center justify-center text-center">
          <Text className="text-6xl font-semibold text-invert">BookStalker</Text>
          <Text className="text-invert/80">Đọc sách theo cách của bạn</Text>
          <Button
            variant="outlinePrimary"
            className="mt-4 self-stretch"
            onPress={() => router.push("/(auth)/login")}
            rightIcon={<Octicons name="arrow-right" />}
          >
            Đăng nhập ngay
          </Button>
        </View>

        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text className="text-invert">
            Chưa có tài khoản? <Text className="underline">Đăng ký</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  )
}
