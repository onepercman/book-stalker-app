import { cn } from "@/libs/utils"
import { useRouter } from "expo-router"
import { FC } from "react"
import { Image, Pressable, Text, View } from "react-native"

export const BookCard: FC<{ data: Book; className?: string }> = ({ data, className }) => {
  const router = useRouter()

  return (
    <Pressable className={cn("h-52 w-full p-2", className)} onPress={() => router.push(`/${data._id}`)}>
      <View className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-default">
        <Image source={{ uri: data.thumbnail }} className="h-40 w-full" />
        <View className="p-2">
          <Text className="line-clamp-1 text-center font-medium">{data.name}</Text>
        </View>
      </View>
    </Pressable>
  )
}
