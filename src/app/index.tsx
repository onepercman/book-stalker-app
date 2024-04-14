import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { View } from "react-native"

export default function () {
  return (
    <View className="flex h-screen w-screen items-center justify-center">
      <Text>Home</Text>
      <Button variant="default">
        <Text>Button</Text>
      </Button>
      <Button variant="outline">
        <Text>Button</Text>
      </Button>
    </View>
  )
}
