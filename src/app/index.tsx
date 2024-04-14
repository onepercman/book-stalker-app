import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function() {
  return <View className="flex items-center justify-center h-screen w-screen">
    <Text>Home</Text>
    <Button variant="default">
      <Text>Button</Text>
    </Button>
  </View>
}