import { cn } from "@/libs/utils"
import { useRouter } from "expo-router"
import { FC } from "react"
import { Image, Pressable, Text, View } from "react-native"

export const CategoryCard: FC<{ data: Category; className?: string }> = ({ data, className }) => {
  const router = useRouter()

  return (
    <Pressable
      className={cn("h-60 w-full p-2", className)}
      onPress={() => router.push(`/explore?category=${data._id}`)}
    >
      <View className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl">
        <Image source={{ uri: data.image }} className="h-60 w-full object-cover" />
        <View className="absolute flex h-full w-full justify-center bg-black/50 text-center">
          <Text className="line-clamp-2 text-center text-lg font-semibold text-white">{data.name}</Text>
        </View>
      </View>
    </Pressable>
  )
}
