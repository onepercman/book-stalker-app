import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"

export default function () {
  const { push } = useRouter()

  return (
    <View className="flex h-screen w-screen flex-col items-center justify-between pb-32 pt-[40vh]">
      <View>
        <Text className="text-6xl">BookStalker</Text>
        <Text>Simple stalking your reading process</Text>
      </View>

      <View className="flex flex-col gap-2">
        <Button className="mt-4 min-w-[15rem]" onPress={() => push("/(auth)/login")}>
          <Text>Login</Text>
        </Button>

        <Pressable onPress={() => push("/(auth)/register")}>
          <Text>Don't have an account yet? Register</Text>
        </Pressable>
      </View>
    </View>
  )
}
