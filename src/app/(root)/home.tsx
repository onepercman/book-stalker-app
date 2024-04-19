import { ScrollView, Text, View } from "react-native"

export default function () {
  return (
    <View className="pt-32">
      <ScrollView contentContainerClassName="flex flex-col gap-4">
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <View className="flex flex-col items-center gap-2 rounded border border-muted" key={index}>
              <View className="h-60 w-full bg-muted"></View>
              <Text className="py-4 text-white">Dummy Book</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  )
}
