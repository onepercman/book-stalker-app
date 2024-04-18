import { Button } from "@/components/ui/button"
import { useRouter } from "expo-router"
import { Text, TextInput, View } from "react-native"

export default function () {
  const router = useRouter()

  return (
    <View className="flex h-screen flex-col items-center justify-center gap-4 p-4 pt-32">
      <Text className="text-3xl text-white">Login</Text>
      <TextInput className="h-16 w-full rounded border border-muted p-2 text-white" placeholder="Email" />
      <TextInput
        textContentType="password"
        className="h-16 w-full rounded border border-muted p-2 text-white"
        placeholder="Password"
      />
      <Button className="self-end" onPress={() => router.replace("/(root)/home")}>
        <Text>Login</Text>
      </Button>
    </View>
  )
}
